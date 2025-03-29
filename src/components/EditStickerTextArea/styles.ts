import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 0;
  border: none;
  border-bottom: 2px solid ${props => props.theme.colors.secondary};
  background: transparent;
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  resize: none;
  outline: none;
  transition: ${props => props.theme.transitions.default};
  font-family: inherit;
  line-height: 1.5;
  display: block;

  &:focus {
    border-bottom-color: ${props => props.theme.colors.text};
  }
`; 