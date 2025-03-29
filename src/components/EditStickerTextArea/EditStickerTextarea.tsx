import { StyledTextarea } from './styles';

interface EditStickerTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const EditStickerTextarea = ({ 
  value, 
  onChange, 
  onBlur,
  onKeyDown 
}: EditStickerTextareaProps) => {
  return (
    <StyledTextarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
}; 