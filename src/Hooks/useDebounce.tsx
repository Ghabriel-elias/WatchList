import { useRef } from "react";

export function useDebounce() {
  const timerId = useRef<any>(null)

  function debounceFn(callback: () => void) {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      callback();
      clearTimeout(timerId?.current);
    }, 1000)
  }

  return debounceFn
}
