import React, {
  FormEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
} from 'react';
import { useFormoContext } from '../core/context';
import { resetValues } from '../utilities/actions';
import { FormHelper } from '../types/form';

interface FormProps<T> {
  onSubmit?: (values: T, helper: FormHelper<T>) => void;
}

export function Form<T>({
  onSubmit,
  children,
}: PropsWithChildren<FormProps<T>>): ReactElement {
  const { getState, form, dispatch } = useFormoContext<T>();
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Should dispatch action to touch all field
      if (onSubmit) {
        const formHelper = form.getFormHelper();
        const values = getState().values;
        onSubmit(values, formHelper);
      } else {
        form.submit();
      }
    },
    [form, onSubmit, getState]
  );
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
