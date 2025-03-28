import { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import randomColor from 'randomcolor';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/EditNote';
import Fab from '@mui/material/Fab';
import { TextField } from '@mui/material';
import { DraggableNoteProps } from '../../types/theme';
import { createMuiStyles } from '../../styles/mui-styles';
import './DraggableNote.css';

export const DraggableNote = ({
  id,
  text,
  position,
  onDelete,
  onUpdate,
  theme,
  isDarkTheme,
}: DraggableNoteProps) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(() =>
    randomColor({
      luminosity: isDarkTheme ? 'dark' : 'light',
    })
  );
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const muiStyles = createMuiStyles(theme);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  useEffect(() => {
    setBackgroundColor(randomColor({ luminosity: isDarkTheme ? 'dark' : 'light' }));
  }, [isDarkTheme]);

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
      onUpdate(id, editText);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    onUpdate(id, editText);
    setIsEditing(false);
  };

  const onHover = () => {
    setIsHover(true);
  };

  const onLeave = () => {
    setIsHover(false);
    handleBlur();
  };

  const style = {
    transform: CSS.Transform.toString({
      x: position.x + (transform?.x || 0),
      y: position.y + (transform?.y || 0),
      scaleX: 1,
      scaleY: 1,
    }),
    position: 'absolute' as const,
    top: 0,
    left: 0,
    touchAction: 'none',
    backgroundColor,
  };

  return (
    <div className='todo-sticker__list' onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className='todo-sticker__item'
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
          <p className='todo-sticker__text' style={{ color: theme.text }}>
            {text}
          </p>
        )}
      </div>

      <div
        className='todo-sticker__buttons'
        style={{
          top: position.y + (transform?.y || 0) - 25,
          left: position.x + (transform?.x || 0) + 180,
          opacity: isHover ? 1 : 0,
          transform: isHover ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <Fab
          size='small'
          color='secondary'
          aria-label='edit'
          onClick={handleEditText}
          className='todo-sticker__button'
        >
          <EditIcon />
        </Fab>

        <Fab
          size='small'
          color='error'
          aria-label='delete'
          onClick={handleDelete}
          className='todo-sticker__button'
        >
          <CloseIcon />
        </Fab>
      </div>
    </div>
  );
};

