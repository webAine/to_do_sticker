import { COMMON_COLORS } from './colors';
import { Theme } from '../types/theme';

export const createMuiStyles = (theme: Theme) => ({
  noteTextField: {
    '& .MuiInputBase-input': {
      color: theme.text,
      transition: 'color 0.3s ease',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.3s ease',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.3s ease',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.3s ease',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.3s ease',
    },
  },
  
  addNoteTextField: {
    width: '350px',
    '& .MuiInputLabel-root': {
      color: COMMON_COLORS.secondary,
      transition: 'color 0.3s ease',
    },
    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
      color: theme.text,
      transition: 'color 0.3s ease',
    },
    '& .MuiInputBase-input': {
      color: theme.text,
      transition: 'color 0.3s ease',
      height: '23px',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.3s ease',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.3s ease',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.3s ease',
      },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.3s ease',
    },
  },

  addButton: {
    color: COMMON_COLORS.secondary,
    transition: 'color 0.3s ease',
    '&:hover': {
      color: theme.text,
      transition: 'color 0.3s ease',
    },
  },
}); 