import { useEffect, useRef } from 'react';
import { useFormoContext } from '../core/context';
import { useRerender } from './common';
import { FormState } from '../core/formControl';
import { shallowEqual } from '../utilities/helper';

function useFormSelector<T, S = unknown>(
  selector: (state: FormState<T>) => S
): S {
  const context = useFormoContext<T>();
  const rerender = useRerender();
  const values = useRef(selector(context.getState()));
  const selectorShouldBeUse = useRef(selector);
  selectorShouldBeUse.current = selector;
  useEffect(() => {
    return context.addSubscription((value) => {
      const newValue = selectorShouldBeUse.current(value);
      if (!shallowEqual(newValue, values.current)) {
        values.current = newValue;
        rerender();
      }
    });
  }, [name]);
  return values.current;
}

export default useFormSelector;
