import { forwardRef } from 'react';
import { InputWrapper, StyledLabel, StyledInput } from './styles';
import { AddStickerInputProps } from '../../types/types';

export const AddStickerInput = forwardRef<HTMLInputElement, AddStickerInputProps>(
  ({ value, onChange, onKeyDown, label }, ref) => {
    return (
      <InputWrapper onClick={(e) => e.stopPropagation()}>
        <StyledInput
          ref={ref}
          type='text'
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          id='add-sticker-input'
        />
        <StyledLabel htmlFor='add-sticker-input' $hasValue={value.length > 0}>
          {label}
        </StyledLabel>
      </InputWrapper>
    );
  }
);
