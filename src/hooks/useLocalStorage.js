import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

/**
 * Custom React hook for syncing state with localStorage
 * @param {string} key - The storage key (without prefix)
 * @param {any} initialValue - Fallback value if key doesn't exist
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return storage.get(key, initialValue);
  });

  useEffect(() => {
    storage.set(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
