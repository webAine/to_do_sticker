import { LIGHT_THEME, DARK_THEME } from './colors';
import 'styled-components';

export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  shadows: {
    light: string;
    medium: string;
    strong: string;
  };
  transitions: {
    default: string;
  };
}

// Расширяем тип DefaultTheme из styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: LIGHT_THEME.primary,
    secondary: LIGHT_THEME.secondary,
    text: LIGHT_THEME.text,
  },
  borderRadius: {
    small: '2px',
    medium: '4px',
    large: '8px',
  },
  shadows: {
    light: '2px 2px 2px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(0,0,0,0.1)',
    medium: '5px 5px 10px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(0,0,0,0.1)',
    strong: '10px 10px 20px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(0,0,0,0.1)',
  },
  transitions: {
    default: '0.2s ease-out',
  },
};

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: DARK_THEME.primary,
    secondary: DARK_THEME.secondary,
    text: DARK_THEME.text,
  },
  borderRadius: {
    small: '2px',
    medium: '4px',
    large: '8px',
  },
  shadows: {
    light: '2px 2px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(255,255,255,0.1)',
    medium: '5px 5px 10px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(255,255,255,0.1)',
    strong: '10px 10px 20px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(255,255,255,0.1)',
  },
  transitions: {
    default: '0.2s ease-out',
  },
}; 