import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormState, createFormControl } from '../core/formControl';
import { getActionType } from '../utilities/helper';
import { FormoProvider } from '../core/context';
import {
  Action,
  changeTouched,
  changeValue,
  resetValues,
  setErrors,
  setIsValidating,
  setTouched,
  setValues,
} from '../utilities/actions';
import { FormError, FormHelper, FormoContextValues } from '../types/form';

interface FormoProps<T extends object> {
  initialValue: T;
  enableReinitialize?: boolean;
  onSubmit: (values: T, helper: FormHelper<T>) => void;
  validation?: (
    values: T
  ) => Partial<FormError<T>> | Promise<Partial<FormError<T>>>;
}

export function Formo<T extends object>({
  initialValue,
  children,
  onSubmit,
  enableReinitialize,
  validation,
}: PropsWithChildren<FormoProps<T>>): ReactElement {
  const initialRef = useRef<FormState<T>>();
  const reducers = useCallback((state: FormState<T>, action: Action) => {
    switch (action.type) {
      case getActionType(changeValue): {
        return {
          ...state,
          values: {
            ...state.values,
            [action.payload.key]: action.payload.value,
          },
        };
      }
      case getActionType(changeTouched): {
        return {
          ...state,
          touched: {
            ...state.touched,
            [action.payload.key]: action.payload.value,
          },
        };
      }
      case getActionType(setValues): {
        return {
          ...state,
          values: {
            ...state.values,
            ...action.payload,
          },
        };
      }
      case getActionType(setErrors): {
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.payload,
          },
        };
      }
      case getActionType(setTouched): {
        return {
          ...state,
          touched: {
            ...state.touched,
            ...action.payload,
          },
        };
      }
      case getActionType(resetValues): {
        return {
          ...state,
          ...initialRef.current,
        };
      }
      case getActionType(setIsValidating): {
        return {
          ...state,
          isValidating: !!action.payload,
        };
      }
      default: {
        return state;
      }
    }
  }, []);
  const [formControl] = useState(createFormControl(initialValue, reducers));
  useEffect(() => {
    initialRef.current = formControl.getState();
  }, []);

  const runValidation = useCallback(async (): Promise<
    undefined | Partial<FormError<T>>
  > => {
    const { values } = formControl.getState();
    if (validation) {
      const error = await validation(values);
      return error;
    }
    return undefined;
  }, []);
  const getFormHelper = useCallback(() => {
    const { getState, dispatch } = formControl;
    const formState = getState();
    const formHelper: FormHelper<T> = {
      reset() {
        dispatch(resetValues());
      },
      errors: formState.errors,
      touched: formState.touched,
      values: formState.values,
      setErrors(values: FormError<T>) {
        dispatch(setErrors(values));
      },
      setTouched(values: Record<keyof T, boolean>) {
        dispatch(setValues(values));
      },
      setValues(values: Partial<T>) {
        dispatch(setValues(values));
      },
    };
    return formHelper;
  }, [formControl]);
  const handleSubmit = useCallback(() => {
    const { dispatch, getState } = formControl;
    formControl.dispatch(setIsValidating(true));
    runValidation().then((error) => {
      formControl.dispatch(setIsValidating(false));
      if (error && Object.keys(error).length !== 0) {
        dispatch(setErrors(error));
      } else {
        dispatch(setErrors(initialRef.current?.errors || {}));
        const formState = getState();
        const formHelper = getFormHelper();
        return onSubmit(formState.values, formHelper);
      }
    });
  }, [getFormHelper, formControl]);
  const formValue = useMemo<FormoContextValues<T>>(
    () => ({
      getState: formControl.getState,
      addSubscription: formControl.addSubscription,
      removeSubscription: formControl.removeSubscription,
      dispatch: formControl.dispatch,
      form: {
        submit: handleSubmit,
        getFormHelper,
      },
    }),
    [formControl, getFormHelper, handleSubmit]
  );

  useEffect(() => {
    if (enableReinitialize) {
      formControl.dispatch(setValues(initialValue));
      initialRef.current = formControl.getState();
    }
  }, [initialValue, enableReinitialize]);

  return <FormoProvider value={formValue}>{children}</FormoProvider>;
}
