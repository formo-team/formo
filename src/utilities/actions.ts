import { createAction } from './helper';

export const changeValue = createAction('CHANGE_VALUE')<{
  key: string;
  value: string;
}>();

export const changeTouched = createAction('CHANGE_TOUCHED')<{
  key: string;
  value: boolean;
}>();

export const setValues = createAction('SET_VALUES')<Record<string, any>>();

export const setErrors = createAction('SET_ERRORS')<
  Record<string, string | undefined | null>
>();
export const setTouched = createAction('SET_TOUCHED')<
  Record<string, boolean>
>();

export const resetValues = createAction('RESET_VALUES')<void>();
export const setIsValidating = createAction('SET_IS_VALIDATING')<boolean>();

export type Action =
  | ReturnType<typeof changeValue>
  | ReturnType<typeof resetValues>
  | ReturnType<typeof setValues>
  | ReturnType<typeof setTouched>
  | ReturnType<typeof setErrors>
  | ReturnType<typeof changeTouched>
  | ReturnType<typeof setIsValidating>;
