import { useState, useEffect } from 'react';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { PiNotePencil, PiPaintBucket, PiX } from 'react-icons/pi';

import { DraggableNoteProps } from '../../types/types';

import { LIGHT_THEME_COLORS, DARK_THEME_COLORS } from '../../styles/colors';
import { 
  NoteWrapper,
  Note,
  ButtonsContainer,
  ActionButton, 
  ColorPickerOverlay,
  ColorPickerPopover, 
  ColorGrid, 
  ColorOption,
  TextareaContainer
} from './styles';

import { EditStickerTextarea } from '../EditStickerTextArea/EditStickerTextarea';

export const DraggableNote = ({
  id,
  text,
  position,
  color,
  onDelete,
  onUpdate,
  theme,
  isDarkTheme,
}: DraggableNoteProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(
    color || (isDarkTheme ? DARK_THEME_COLORS[0] : LIGHT_THEME_COLORS[0])
  );
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [colorAnchorEl, setColorAnchorEl] = useState<null | HTMLElement>(null);

  const { attributes, listeners: originalListeners, setNodeRef, transform } = useDraggable({ 
    id,
  });
  
  const listeners = {
    ...originalListeners,
    onMouseDown: (e: React.MouseEvent) => {
      e.stopPropagation();
      if (originalListeners && originalListeners.onMouseDown) {
        originalListeners.onMouseDown(e);
      }
    },
    onTouchStart: (e: React.TouchEvent) => {
      e.stopPropagation();
      if (originalListeners && originalListeners.onTouchStart) {
        originalListeners.onTouchStart(e);
      }
    }
  };

  const handleEditText = () => {
    setIsEditing(true);
  };

  const handleChangeText = (value: string) => {
    setEditText(value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      onUpdate(id, editText, backgroundColor);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    onUpdate(id, editText, backgroundColor);
    setIsEditing(false);
  };

  const onHover = () => {
    setIsHover(true);
  };

  const onLeave = () => {
    setIsHover(false);
    handleBlur();
    handleColorClose();
  };

  const handleColorClick = (event: React.MouseEvent<HTMLElement>) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const handleColorChange = (newColor: string) => {
    setBackgroundColor(newColor);
    onUpdate(id, text, newColor);
  };

  useEffect(() => {
    const currentColors = isDarkTheme ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
    const oppositeColors = isDarkTheme ? LIGHT_THEME_COLORS : DARK_THEME_COLORS;
    
    if (oppositeColors.includes(backgroundColor)) {
      const index = oppositeColors.indexOf(backgroundColor);
      const newColor = currentColors[index] || currentColors[0];
      setBackgroundColor(newColor);
      onUpdate(id, text, newColor);
    }
  }, [isDarkTheme]);

  const transformString = CSS.Transform.toString(transform ? {
    x: position.x + transform.x,
    y: position.y + transform.y,
    scaleX: 1,
    scaleY: 1,
  } : {
    x: position.x,
    y: position.y,
    scaleX: 1,
    scaleY: 1,
  }) || '';

  return (
    <NoteWrapper onMouseEnter={onHover} onMouseLeave={onLeave}>
      <Note
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        $isHover={isHover}
        $isDarkTheme={isDarkTheme}
        $transform={transformString}
        $backgroundColor={backgroundColor}
      >
        {isEditing ? (
          <TextareaContainer>
            <EditStickerTextarea
              value={editText}
              onChange={handleChangeText}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </TextareaContainer>
        ) : (
          <p style={{ color: theme.text }}>{text}</p>
        )}
      </Note>

      <ButtonsContainer 
        $isHover={isHover}
        $position={{
          x: transform ? position.x + transform.x : position.x,
          y: transform ? position.y + transform.y : position.y
        }}
      >
        <ActionButton
          $variant="edit"
          onClick={handleEditText}
        >
          <PiNotePencil />
        </ActionButton>

        <ActionButton
          $variant="color"
          onClick={handleColorClick}
        >
          <PiPaintBucket />
        </ActionButton>

        <ColorPickerOverlay 
          $isOpen={Boolean(colorAnchorEl)} 
          onClick={handleColorClose}
        />
        
        <ColorPickerPopover
          $isOpen={Boolean(colorAnchorEl)}
        >
          <ColorGrid>
            {(isDarkTheme ? DARK_THEME_COLORS : LIGHT_THEME_COLORS).map((color, index) => (
              <ColorOption
                key={index}
                $color={color}
                $isSelected={backgroundColor === color}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorChange(color);
                  handleColorClose();
                }}
              />
            ))}
          </ColorGrid>
        </ColorPickerPopover>

        <ActionButton
          $variant="delete"
          onClick={handleDelete}
        >
          <PiX />
        </ActionButton>
      </ButtonsContainer>
    </NoteWrapper>
  );
};

