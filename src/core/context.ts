import { createContext, useContext } from 'react';
import { FormoContextValues } from '../types/form';

const FormoContext = createContext<any>(null);

export const FormoProvider = FormoContext.Provider;
export const FormoConsumer = FormoContext.Consumer;

export function useFormoContext<V>(): FormoContextValues<V> {
  const formoValues = useContext<FormoContextValues<V>>(FormoContext);

  if (!formoValues) {
    throw new Error('Please wrap in Formo component');
  }

  return formoValues;
}
