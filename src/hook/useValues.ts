import { useEffect, useMemo, useRef } from 'react';
import { useFormoContext } from '../core/context';
import { FormState } from '../core/formControl';
import { shallowEqual } from '../utilities/helper';
import { useRerender } from './common';
export function useValues<T extends object = any, P extends keyof T = any>(
  names?: P[]
): typeof names extends undefined ? T : Pick<T, P> {
  const context = useFormoContext<T>();
  const rerender = useRerender();
  const fieldNames = useMemo(() => names, [names]);
  const selector = useRef<
    (state: FormState<T>) => typeof names extends undefined ? T : Pick<T, P>
  >((state: FormState<T>) => {
    return (
      fieldNames?.reduce<typeof names extends undefined ? T : Pick<T, P>>(
        (acc, name) => {
          return {
            ...acc,
            [name]: state.values[name],
          };
        },
        {} as any
      ) || state.values
    );
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

  return values.current;
}
