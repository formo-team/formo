import { DefaultAction, FormError, Subscription } from '../types/form';

export interface FormState<T> {
  values: T;
  errors: FormError<T>;
  touched: Record<keyof T, boolean>;
  isValidating: boolean;
}

class FormControl<T, ActionType = DefaultAction> {
  private formState: FormState<T>;

  private readonly reducer: (
    state: FormState<T>,
    action: ActionType
  ) => FormState<T>;

  private subscription: Subscription<FormState<T>>[] = [];

  constructor(
    state: T,
    reducer: (state: FormState<T>, action: ActionType) => FormState<T>
  ) {
    this.formState = {
      values: state,
      errors: (Object.keys(state) as any[]).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {}
      ),
      touched: (Object.keys(state) as any[]).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      ),
      isValidating: false,
    };
    this.reducer = reducer;
  }

  dispatch = (action: ActionType): void => {
    const old = this.formState;
    this.formState = this.reducer(this.formState, action);
    if (old !== this.formState) {
      this.notifySubscriber();
    }
  };

  addSubscription = (sub: Subscription<FormState<T>>): (() => void) => {
    this.subscription = [...this.subscription, sub];
    return (): void => {
      this.subscription = this.subscription.filter((i) => i !== sub);
    };
  };

  removeSubscription = (sub: Subscription<FormState<T>>): void => {
    this.subscription = this.subscription.filter((i) => i !== sub);
  };

  getState = (): FormState<T> => {
    return this.formState;
  };

  private notifySubscriber = (): void => {
    const state = this.getState();
    this.subscription.forEach((sub) => {
      sub(state);
    });
  };
}

export const createFormControl = <T, ActionType = DefaultAction>(
  initialForm: T,
  reducer: (state: FormState<T>, action: ActionType) => FormState<T>
): FormControl<T, ActionType> => {
  return new FormControl(initialForm, reducer);
};
