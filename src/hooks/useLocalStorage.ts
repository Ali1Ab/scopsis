import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isFirstLoadRef = useRef(true);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const item = window.localStorage.getItem(key);
      if (item != null) {
        setStoredValue(JSON.parse(item) as T);
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
    } catch {}
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {}
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
