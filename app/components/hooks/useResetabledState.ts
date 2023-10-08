import { useCallback, useState } from "react";

export function useResetabledState<T>() {
  const [state, setState] = useState<T | null>(null);

  const changeState = useCallback((value: T | null) => {
    setState(value);
  }, []);

  const resetState = useCallback(() => {
    setState(null);
  }, []);

  return [state, changeState, resetState] as const;
}
