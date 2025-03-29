// Цвета для тем интерфейса
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
  primary: '#6366F1',    // основной акцентный цвет (индиго)
  secondary: '#A5B4FC',  // второстепенный акцентный цвет (светлый индиго)
  success: '#22C55E',    // цвет успеха (зеленый)
  warning: '#F59E0B',    // цвет предупреждения (оранжевый)
  error: '#EF4444',      // цвет ошибки (красный)
  info: '#3B82F6',       // информационный цвет (синий)
} as const;

// Цвета для стикеров
export const LIGHT_THEME_COLORS = [
  '#FFB3BA', // Светло-розовый
  '#BAFFC9', // Светло-зеленый
  '#BAE1FF', // Светло-голубой
  '#FFFFBA', // Светло-желтый
  '#E8BAFF', // Светло-фиолетовый
  '#FFD9BA', // Светло-оранжевый
  '#B3FFE3', // Светло-мятный
  '#FFB3E6', // Светло-малиновый
];

export const DARK_THEME_COLORS = [
  '#FF6B6B', // Темно-розовый
  '#4CAF50', // Темно-зеленый
  '#2196F3', // Темно-голубой
  '#FFC107', // Темно-желтый
  '#9C27B0', // Темно-фиолетовый
  '#FF9800', // Темно-оранжевый
  '#00BFA5', // Темно-мятный
  '#E91E63', // Темно-малиновый
];

// Функция для получения случайного цвета стикера
export const getRandomColor = (isDarkTheme: boolean): string => {
  const colors = isDarkTheme ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// Текущая тема (пока используем светлую)
export const CURRENT_THEME = LIGHT_THEME; 