import { COMMON_COLORS } from './colors';
import { Theme } from '../types/theme';

export const createMuiStyles = (theme: Theme) => ({
  noteTextField: {
    '& .MuiInputBase-input': {
      color: theme.text,
      transition: 'color 0.2s ease',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.2s ease',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.2s ease',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.2s ease',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.text,
      transition: 'border-color 0.2s ease',
    },
  },
  
  addNoteTextField: {
    width: '350px',
    '& .MuiInputLabel-root': {
      color: COMMON_COLORS.secondary,
      transition: 'all 0.2s ease-in-out',
    },
    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
      color: theme.text,
      transition: 'all 0.2s ease-in-out',
    },
    '& .MuiInputBase-input': {
      color: theme.text,
      transition: 'all 0.2s ease-in-out',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.text,
      transition: 'all 0.2s ease-in-out',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme.text,
      transition: 'all 0.2s ease-in-out',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: theme.text,
      transition: 'all 0.2s ease-in-out',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.text,
      transition: 'all 0.2s ease-in-out',
    },
  },

  addButton: {
    color: COMMON_COLORS.secondary,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      color: theme.text,
      transition: 'all 0.2s ease-in-out',
    },
  },

  colorPickerPopover: {
    zIndex: 9999,
    '& .MuiPaper-root': {
      backgroundColor: theme.secondary,
      borderRadius: '10px',
    },
  },

  colorPickerContainer: {
    padding: '5px',
  },
}); 