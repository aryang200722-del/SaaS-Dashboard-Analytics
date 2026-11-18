/**
 * LocalStorage utilities for Nexora SaaS Dashboard
 * Provides safe JSON serialization, error handling, and key prefixing.
 */

const STORAGE_PREFIX = 'nexora_';

export const storage = {
  /**
   * Get an item from localStorage with a fallback value.
   * @param {string} key
   * @param {any} defaultValue
   * @returns {any}
   */
  get(key, defaultValue = null) {
    try {
      const item = window.localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`[Nexora Storage] Error reading key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Set an item in localStorage.
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.error(`[Nexora Storage] Error saving key "${key}":`, error);
    }
  },

  /**
   * Remove an item from localStorage.
   * @param {string} key
   */
  remove(key) {
    try {
      window.localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      console.error(`[Nexora Storage] Error removing key "${key}":`, error);
    }
  },

  /**
   * Clear all Nexora keys from localStorage.
   */
  clearNexora() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    } catch (error) {
      console.error('[Nexora Storage] Error clearing storage:', error);
    }
  },

  /**
   * Check if a key exists in storage.
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return window.localStorage.getItem(STORAGE_PREFIX + key) !== null;
  }
};
