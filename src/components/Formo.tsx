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
  setTouched,
  setValues,
} from '../utilities/actions';
import { FormHelper, FormoContextValues } from '../types/form';

interface FormoProps<T> {
  initialValue: T;
  enableReinitialize?: boolean;
  onSubmit: (values: T, helper: FormHelper<T>) => void;
}

export function Formo<T = never>({
  initialValue,
  children,
  onSubmit,
  enableReinitialize,
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
      default: {
        return state;
      }
    }
  }, []);
  const [formControl] = useState(createFormControl(initialValue, reducers));
  useEffect(() => {
    initialRef.current = formControl.getState();
  }, []);

  const formValue = useMemo<FormoContextValues<T>>(
    () => ({
      getState: formControl.getState,
      addSubscription: formControl.addSubscription,
      removeSubscription: formControl.removeSubscription,
      dispatch: formControl.dispatch,
      form: {
        submit: onSubmit,
      },
    }),
    [onSubmit, formControl]
  );
  useEffect(() => {
    if (enableReinitialize) {
      formControl.dispatch(setValues(initialValue));
      initialRef.current = formControl.getState();
    }
  }, [initialValue, enableReinitialize]);
  return <FormoProvider value={formValue}>{children}</FormoProvider>;
}
