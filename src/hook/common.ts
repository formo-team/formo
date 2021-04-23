import { useCallback, useState } from 'react';

export const useRerender = (): (() => void) => {
  const [, setC] = useState(0);
  return useCallback(() => setC((p) => p + 1), []);
};
