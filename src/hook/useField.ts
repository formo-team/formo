import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useFormoContext } from '../core/context';
import { FormState } from '../core/formControl';
import { shallowEqual } from '../utilities/helper';
import { FieldValue, Helper } from '../types/form';
import { changeTouched, changeValue } from '../utilities/actions';
import { useRerender } from './common';

export function useField<T = any>(name: string): [FieldValue, Helper] {
  const context = useFormoContext<T>();
  const rerender = useRerender();
  const selector = useRef((state: FormState<T>) => {
    return {
      value: state.values[name],
      touched: state.touched[name],
      error: state.errors[name],
    };
  }).current;
  const values = useRef(selector(context.getState()));
  useEffect(() => {
    return context.addSubscription((value) => {
      const newValue = selector(value);
      if (!shallowEqual(newValue, values.current)) {
        values.current = newValue;
        rerender();
      }
    });
  }, [name]);
  const setFieldValue = useCallback(
    (value: string) => context.dispatch(changeValue({ key: name, value })),
    [name]
  );
  const field = {
    name,
    value: values.current.value,
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
  return [field, helper];
}
