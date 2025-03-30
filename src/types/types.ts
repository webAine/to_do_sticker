export interface Task {
  id: string;
  text: string;
  position: { x: number; y: number };
  color: string;
  isColorSetByUser: boolean;
}
export interface DraggableNoteProps extends Task {
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string, color?: string) => void;
  theme: Theme;
  isDarkTheme: boolean;
}
export interface ZoomableContainerProps {
  children: React.ReactNode;
  onZoomChange?: (scale: number) => void;
  onBackgroundClick?: () => void;
}
export interface Theme {
  primary: string;
  secondary: string;
  text: string;
} 
export interface HeaderProps {
  handleThemeToggle: () => void;
  isDarkTheme: boolean;
  textColor: string;
}
export interface AddStickerInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  label: string;
}
export interface EditStickerTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}