import { useState, useEffect } from 'react';
import { LIGHT_THEME, DARK_THEME } from '../styles/colors';
import { Theme } from '../types/theme';
import { getTheme, saveTheme } from '../services/localStorage';

export const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return getTheme();
  });

  const theme: Theme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    saveTheme(isDarkTheme);
  }, [isDarkTheme]);

  return {
    theme,
    isDarkTheme,
    toggleTheme,
  };
};
