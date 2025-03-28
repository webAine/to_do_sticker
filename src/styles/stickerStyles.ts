export const createStickerStyles = (isDarkTheme: boolean) => ({
  list: {
    position: 'relative' as const,
    zIndex: 3000,
  },
  
  item: {
    width: 250,
    minHeight: 120,
    paddingTop: 25,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 2,
    cursor: 'move' as const,
    position: 'absolute' as const,
    boxShadow: isDarkTheme 
      ? '2px 2px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(255,255,255,0.1)'
      : '2px 2px 2px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
  },

  itemAfter: {
    content: '""',
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    background: `linear-gradient(135deg, transparent 50%, ${
      isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
    } 50%)`,
    borderRadius: '0 0 2px 0',
  },

  itemHover: {
    transform: 'scale(1.02) rotate(1deg)',
    boxShadow: isDarkTheme
      ? '5px 5px 10px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(255,255,255,0.1)'
      : '5px 5px 10px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(0,0,0,0.1)',
  },

  buttons: {
    position: 'absolute' as const,
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    display: 'flex',
    gap: 4,
  },

  button: {
    cursor: 'pointer',
    width: '28px !important',
    height: '28px !important',
    minHeight: '28px !important',
    '& svg': {
      width: '16px',
      height: '16px',
    },
  },
}); 