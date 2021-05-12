import { useMemo, useRef } from 'react';
import { FormState } from '../core/formControl';
import useFormSelector from './useFormSelector';

type ErrorByField<T extends object, P extends keyof T> = Pick<
  FormState<T>['errors'],
  P
>;

export function useErrors<T extends object = any, P extends keyof T = any>(
  names?: P[]
): typeof names extends undefined ? T : ErrorByField<T, P> {
  const fieldNames = useMemo(() => names, [names]);
  const selector = useRef<
    (
      state: FormState<T>
    ) => typeof names extends undefined ? T : ErrorByField<T, P>
  >((state: FormState<T>) => {
    return (
      fieldNames?.reduce<
        typeof names extends undefined ? T : ErrorByField<T, P>
      >((acc, name) => {
        return {
          ...acc,
          [name]: state.errors[name],
        };
      }, {} as any) || state.errors
    );
  }).current;
  const values = useFormSelector(selector);
  return values;
}
