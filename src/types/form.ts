import { ChangeEvent } from 'react';
import { FormState } from '../core/formControl';

export interface FieldValue {
  name: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

export type FormError<T> = Record<keyof T, string | undefined | null>;

export interface FieldHelper {
  setFieldValue: (v: string) => void;
}
export interface FieldMeta {
  error: string;
  touched: boolean;
}

export interface FormHelper<T = never> {
  setValues(values: Partial<T>): void;
  setTouched(values: Partial<Record<keyof T, boolean>>): void;
  setErrors(values: Partial<FormError<T>>): void;
  reset(): void;
  touched: Record<keyof T, boolean>;
  errors: FormError<T>;
  values: T;
}

export interface FormoContextValues<T, ActionType = DefaultAction> {
  getState(): FormState<T>;
  dispatch(action: ActionType): void;
  addSubscription(sub: Subscription<FormState<T>>): () => void;
  removeSubscription(sub: Subscription<FormState<T>>): void;
  form: {
    submit(): void;
    getFormHelper(): FormHelper<T>;
  };
}

export interface DefaultAction {
  type: string;
  payload: any;
}

export interface Subscription<T> {
  (state: T): void;
}

export type TypeConstant = string;

export interface ActionCreator<ActionType, PayloadType> {
  (payload: PayloadType): {
    type: ActionType;
    payload: PayloadType;
  };
  getType(): ActionType;
}
