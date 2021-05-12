import { ChangeEvent, useCallback, useMemo } from 'react';
import { useFormoContext } from '../core/context';
import { FormState } from '../core/formControl';
import { FieldValue, FieldHelper, FieldMeta } from '../types/form';
import { changeTouched, changeValue } from '../utilities/actions';
import useFormSelector from './useFormSelector';

export function useField<T = any>(
  name: string
): [FieldValue, FieldHelper, FieldMeta] {
  const context = useFormoContext<T>();
  const values = useFormSelector((state: FormState<T>) => {
    return {
      value: state.values[name],
      touched: state.touched[name],
      error: state.errors[name],
    };
  });
  const setFieldValue = useCallback(
    (value: string) => context.dispatch(changeValue({ key: name, value })),
    [name]
  );
  const field = {
    name,
    value: values.value,
    onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
      context.dispatch(changeValue({ key: name, value: e.target.value }));
    },
    onBlur(): void {
      context.dispatch(changeTouched({ key: name, value: true }));
    },
  };
  const helper = useMemo(() => {
    return { setFieldValue };
  }, [setFieldValue]);
  const meta = useMemo(
    () => ({
      touched: values.touched,
      error: values.error,
    }),
    [values.touched, values.error]
  );
  return [field, helper, meta];
}
