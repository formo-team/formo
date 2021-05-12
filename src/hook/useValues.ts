import { useMemo, useRef } from 'react';
import { FormState } from '../core/formControl';
import useFormSelector from './useFormSelector';

export function useValues<T extends object = any, P extends keyof T = any>(
  names?: P[]
): typeof names extends undefined ? T : Pick<T, P> {
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
  const values = useFormSelector(selector);
  return values;
}
