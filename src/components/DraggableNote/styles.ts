import styled from 'styled-components';
import { COMMON_COLORS } from '../../styles/colors';

export const NoteWrapper = styled.div`
  position: relative;
  z-index: 3000;
`;

export const Note = styled.div<{ $isHover: boolean; $isDarkTheme: boolean; $transform: string; $backgroundColor: string }>`
  width: 250px;
  min-height: 120px;
  padding: 25px 15px 15px;
  border-radius: 2px;
  cursor: move;
  position: absolute;
  background-color: ${props => props.$backgroundColor};
  transform: ${props => props.$transform};
  box-shadow: ${props => props.$isDarkTheme
    ? '2px 2px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(255,255,255,0.1)'
    : '2px 2px 2px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(0,0,0,0.1)'};
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;

  ${props => props.$isHover && `
    transform: ${props.$transform} scale(1.02) rotate(1deg);
    box-shadow: ${props.$isDarkTheme
      ? '5px 5px 10px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(255,255,255,0.1)'
      : '5px 5px 10px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(0,0,0,0.1)'};
  `}

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, transparent 50%, ${props => 
      props.$isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
    } 50%);
    border-radius: 0 0 2px 0;
  }
`;

export const ButtonsContainer = styled.div<{ $isHover: boolean; $position: { x: number; y: number } }>`
  position: absolute;
  top: ${props => props.$position.y - 17}px;
  left: ${props => props.$position.x + 170}px;
  display: flex;
  gap: 4px;
  opacity: ${props => props.$isHover ? 1 : 0};
  transform: ${props => props.$isHover ? 'translateY(0)' : 'translateY(100%)'};
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
`;

export const ActionButton = styled.button<{ $variant?: 'edit' | 'color' | 'delete' }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${props => {
    switch (props.$variant) {
      case 'edit':
        return COMMON_COLORS.info;
      case 'color':
        return COMMON_COLORS.primary;
      case 'delete':
        return COMMON_COLORS.error;
      default:
        return props.theme.colors.primary;
    }
  }};
  color: #FFFFFF;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: ${props => {
      switch (props.$variant) {
        case 'edit':
          return COMMON_COLORS.secondary;
        case 'color':
          return COMMON_COLORS.secondary;
        case 'delete':
          return COMMON_COLORS.warning;
        default:
          return props.theme.colors.secondary;
      }
    }};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const TextareaContainer = styled.div`
  height: 100%;
`;

export const ColorPickerOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 999;
`;

export const ColorPickerPopover = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  background: ${props => props.theme.isDark ? '#2A2A2D' : '#FFFFFF'};
  border-radius: 12px;
  padding: 16px;
  box-shadow: ${props => 
    props.theme.isDark 
      ? '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)' 
      : '0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
  };
  z-index: 1000;
  border: 1px solid ${props => 
    props.theme.isDark 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'
  };
  backdrop-filter: blur(8px);
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  min-width: 120px;
`;

export const ColorOption = styled.div<{ $color: string; $isSelected: boolean }>`
  width: 32px;
  height: 32px;
  background-color: ${props => props.$color};
  border-radius: 50%;
  cursor: pointer;
  border: ${props => props.$isSelected ? `2px solid ${props.theme.text}` : 'none'};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`; 