import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * A custom hook that behaves like useState but automatically
 * synchronizes its value with the browser's localStorage.
 *
 * Interview line: "I extracted the persistence logic into a custom hook
 * so any piece of state can be saved with one line, instead of repeating
 * useEffect + JSON.stringify everywhere."
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error writing localStorage key "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
