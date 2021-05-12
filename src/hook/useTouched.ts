import { useMemo, useRef } from 'react';
import { FormState } from '../core/formControl';
import useFormSelector from './useFormSelector';

type TouchedByField<T extends object, P extends keyof T> = Pick<
  FormState<T>['touched'],
  P
>;
export function useTouched<T extends object = any, P extends keyof T = any>(
  names?: P[]
): typeof names extends undefined ? T : TouchedByField<T, P> {
  const fieldNames = useMemo(() => names, [names]);
  const selector = useRef<
    (
      state: FormState<T>
    ) => typeof names extends undefined ? T : TouchedByField<T, P>
  >((state: FormState<T>) => {
    return (
      fieldNames?.reduce<
        typeof names extends undefined ? T : TouchedByField<T, P>
      >((acc, name) => {
        return {
          ...acc,
          [name]: state.touched[name],
        };
      }, {} as any) || state.touched
    );
  }).current;
  const touched = useFormSelector(selector);
  return touched;
}
