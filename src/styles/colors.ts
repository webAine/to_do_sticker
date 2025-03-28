export const LIGHT_THEME = {
  primary: '#F5F5F0',    // основной светлый фон
  secondary: '#808080',  // второстепенные элементы
  text: '#2C3333',      // основной текст
} as const;

export const DARK_THEME = {
  primary: '#1A1A1D',    // основной темный фон
  secondary: '#808080',  // второстепенные элементы
  text: '#E8E8E8',      // основной текст
} as const;

// Общие цвета для обеих тем
export const COMMON_COLORS = {
  secondary: '#808080',  // для элементов, которые не меняются в темах
  error: '#FF3333',     // для ошибок и удаления
  success: '#4CAF50',   // для успешных действий
} as const;

// Текущая тема (пока используем светлую)
export const CURRENT_THEME = LIGHT_THEME; 