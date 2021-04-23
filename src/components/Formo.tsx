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
  changeValue,
  resetValues,
  setValues,
} from '../utilities/actions';
import { FormoContextValues } from '../types/form';

interface FormoProps<T> {
  initialValue: T;
  enableReinitialize?: boolean;
  onSubmit: (values: T) => void;
}

export function Formo<T = never>({
  initialValue,
  children,
  onSubmit,
  enableReinitialize,
}: PropsWithChildren<FormoProps<T>>): ReactElement {
  const initialRef = useRef<FormState<T>>();
  const reducers = useCallback((state: FormState<T>, action: Action) => {
    console.log(action);
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
      case getActionType(setValues): {
        return {
          ...state,
          values: action.payload,
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
