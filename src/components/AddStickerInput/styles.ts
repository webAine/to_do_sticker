import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  width: 300px;
`;

export const StyledLabel = styled.label<{ $hasValue: boolean }>`
  position: absolute;
  left: 0;
  top: ${props => props.$hasValue ? '-20px' : '0'};
  color: ${props => props.theme.colors.text};
  transition: ${props => props.theme.transitions.default};
  font-size: ${props => props.$hasValue ? '14px' : '16px'};
  cursor: text;
  opacity: ${props => props.$hasValue ? 0.7 : 1};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 3px 0;
  border: none;
  border-bottom: 2px solid ${props => props.theme.colors.secondary};
  background: transparent;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  outline: none;
  transition: ${props => props.theme.transitions.default};

  &:focus {
    border-bottom-color: ${props => props.theme.colors.text};
  }

  &:focus + ${StyledLabel} {
    top: -20px;
    font-size: 14px;
    opacity: 0.7;
  }
`; 