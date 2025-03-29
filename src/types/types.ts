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
export interface Theme {
  primary: string;
  secondary: string;
  text: string;
} 