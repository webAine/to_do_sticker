export interface Task {
  id: string;
  text: string;
  position: { x: number; y: number };
}
export interface DraggableNoteProps extends Task {
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
  theme: Theme;
  isDarkTheme: boolean;
}
export interface Theme {
  primary: string;
  secondary: string;
  text: string;
} 