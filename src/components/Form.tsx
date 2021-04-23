import React, {
  FormEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
} from 'react';
import { useFormoContext } from '../core/context';
import { resetValues, setErrors, setValues } from '../utilities/actions';
import { FormHelper } from '../types/form';

interface FormProps<T> {
  onSubmit?: (values: T, helper: FormHelper<T>) => void;
}

export function Form<T>({
  onSubmit,
  children,
}: PropsWithChildren<FormProps<T>>): ReactElement {
  const { getState, form, dispatch } = useFormoContext<T>();
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    e.stopPropagation();
    const formState = getState();
    const formHelper: FormHelper<T> = {
      reset() {
        dispatch(resetValues());
      },
      errors: formState.errors,
      touched: formState.touched,
      values: formState.values,
      setErrors(values: Record<keyof T, string>) {
        dispatch(setErrors(values));
      },
      setTouched(values: Record<keyof T, boolean>) {
        dispatch(setValues(values));
      },
      setValues(values: Partial<T>) {
        dispatch(setValues(values));
      },
    };
    const values = getState().values;
    // Should dispatch action to touch all field
    if (onSubmit) {
      onSubmit(values, formHelper);
    } else {
      form.submit(values, formHelper);
    }
  }, []);
  const handleReset = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(resetValues());
  }, []);
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      {children}
    </form>
  );
}
