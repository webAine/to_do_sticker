import { EditStickerTextareaProps } from '../../types/types';
import { StyledTextarea } from './styles';

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