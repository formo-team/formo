import { createAction } from './helper';

export const changeValue = createAction('CHANGE_VALUE')<{
  key: string;
  value: string;
}>();

export const setValues = createAction('SET_VALUES')<any>();

export const resetValues = createAction('RESET_VALUES')<void>();

export type Action =
  | ReturnType<typeof changeValue>
  | ReturnType<typeof resetValues>
  | ReturnType<typeof setValues>;
