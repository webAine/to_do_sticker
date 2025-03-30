import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  background-color: ${props => props.theme.colors.primary};
  align-items: center;
  padding: 10px 50px;
  top: 2%;
  width: 90%;
  left: 5%;
  z-index: 999999;
  box-shadow: ${props => props.theme.shadows.strong};
  border-radius: 8px;
`;

export const ThemeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
