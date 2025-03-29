import { InputWrapper, StyledLabel, StyledInput } from './styles';

interface AddStickerInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  label: string;
}

export const AddStickerInput = ({ value, onChange, onKeyDown, label }: AddStickerInputProps) => {
  return (
    <InputWrapper>
      <StyledInput
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        id="add-sticker-input"
      />
      <StyledLabel 
        htmlFor="add-sticker-input"
        $hasValue={value.length > 0}
      >
        {label}
      </StyledLabel>
    </InputWrapper>
  );
}; 