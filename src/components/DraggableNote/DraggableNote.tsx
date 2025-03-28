import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import randomColor from 'randomcolor';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/EditNote';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Fab from '@mui/material/Fab';
import { TextField, Popover } from '@mui/material';
import { DraggableNoteProps } from '../../types/theme';
import { createMuiStyles } from '../../styles/mui-styles';
import { createStickerStyles } from '../../styles/stickerStyles';
import { HexColorPicker } from 'react-colorful';

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
  const [backgroundColor, setBackgroundColor] = useState<string>(color || randomColor({
    luminosity: isDarkTheme ? 'dark' : 'light',
  }));
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [colorAnchorEl, setColorAnchorEl] = useState<null | HTMLElement>(null);

  const muiStyles = createMuiStyles(theme);
  const stickerStyles = createStickerStyles(isDarkTheme);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  

  const handleEditText = () => {
    setIsEditing(true);
  };

  const handleChangeText = (value: string) => {
    setEditText(value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

  const style = {
    ...stickerStyles.item,
    ...(isHover ? stickerStyles.itemHover : {}),
    transform: CSS.Transform.toString(transform ? {
      x: position.x + transform.x,
      y: position.y + transform.y,
      scaleX: 1,
      scaleY: 1,
    } : {
      x: position.x,
      y: position.y,
      scaleX: 1,
      scaleY: 1,
    }),
    backgroundColor,
  };

  const buttonStyle = {
    ...stickerStyles.buttons,
    top: transform ? position.y + transform.y - 17 : position.y - 17,
    left: transform ? position.x + transform.x + 170 : position.x + 170,
    opacity: isHover ? 1 : 0,
    transform: isHover ? 'translateY(0)' : 'translateY(100%)',
  };

  return (
    <div style={stickerStyles.list} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        onKeyDown={handleKeyDown}
      >
        {isEditing ? (
          <div>
            <TextField
              multiline
              fullWidth
              value={editText}
              onChange={(e) => handleChangeText(e.target.value)}
              onBlur={handleBlur}
              variant='standard'
              sx={muiStyles.noteTextField}
            />
          </div>
        ) : (
          <p style={{ color: theme.text }}>{text}</p>
        )}
        <div style={stickerStyles.itemAfter} />
      </div>

      <div
        style={buttonStyle}
      >
        <Fab
          size='small'
          color='secondary'
          aria-label='edit'
          onClick={handleEditText}
          sx={{
            width: 26,
            height: 26,
            minHeight: 26,
            '& .MuiSvgIcon-root': {
              width: 18,
              height: 18,
            },
          }}
        >
          <EditIcon />
        </Fab>

        <Fab
          size='small'
          color='primary'
          aria-label='change color'
          onClick={handleColorClick}
          sx={{
            width: 26,
            height: 26,
            minHeight: 26,
            '& .MuiSvgIcon-root': {
              width: 18,
              height: 18,
            },
          }}
        >
          <ColorLensIcon />
        </Fab>

        <Popover
          open={Boolean(colorAnchorEl)}
          anchorEl={colorAnchorEl}
          onClose={handleColorClose}
          marginThreshold={0}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 290, left: 260}}
          sx={muiStyles.colorPickerPopover}
        >
          <div style={muiStyles.colorPickerContainer}>
            <HexColorPicker color={backgroundColor} onChange={handleColorChange} />
          </div>
        </Popover>

        <Fab
          size='small'
          color='error'
          aria-label='delete'
          onClick={handleDelete}
          sx={{
            width: 26,
            height: 26,
            minHeight: 26,
            '& .MuiSvgIcon-root': {
              width: 18,
              height: 18,
            },
          }}
        >
          <CloseIcon />
        </Fab>
      </div>
    </div>
  );
};

