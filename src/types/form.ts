import { ChangeEvent } from 'react';
import { FormState } from '../core/formControl';

export interface FieldValue {
  name: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

export interface Helper {
  setFieldValue: (v: string) => void;
}

export interface FormoContextValues<T, ActionType = DefaultAction> {
  getState(): FormState<T>;
  dispatch(action: ActionType): void;
  addSubscription(sub: Subscription<FormState<T>>): () => void;
  removeSubscription(sub: Subscription<FormState<T>>): void;
  form: {
    submit(values: T): void;
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
