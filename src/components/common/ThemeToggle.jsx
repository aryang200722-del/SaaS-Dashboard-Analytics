import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { addToast } = useToast();

  const handleToggle = () => {
    toggleTheme();
    addToast({
      title: `${isDark ? 'Light' : 'Dark'} Mode Enabled`,
      message: `Theme switched to ${isDark ? 'light' : 'dark'} mode.`,
      type: 'info',
      duration: 2500
    });
  };

  return (
    <button
      className="btn-icon"
      onClick={handleToggle}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={18} className="theme-icon-sun" />
      ) : (
        <Moon size={18} className="theme-icon-moon" />
      )}
    </button>
  );
}
