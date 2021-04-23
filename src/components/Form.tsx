import React, {
  FormEventHandler,
  PropsWithChildren,
  ReactElement,
  useCallback,
} from 'react';
import { useFormoContext } from '../core/context';
import { resetValues } from '../utilities/actions';

interface FormProps<T> {
  onSubmit?: (values: T) => void;
}

export function Form<T>({
  onSubmit,
  children,
}: PropsWithChildren<FormProps<T>>): ReactElement {
  const { getState, form, dispatch } = useFormoContext<T>();
  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    e.stopPropagation();
    const values = getState().values;
    // Should dispatch action to touch all field
    if (onSubmit) {
      onSubmit(values);
    } else {
      form.submit(values);
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
