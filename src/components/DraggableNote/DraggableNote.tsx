import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../App';
import CloseIcon from '@mui/icons-material/Close';
import randomColor from 'randomcolor';
import './DraggableNote.css';
import { TextField } from '@mui/material';

interface DraggableNoteProps extends Task {
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
}

export const DraggableNote = ({ id, text, position, onDelete, onUpdate }: DraggableNoteProps) => {
  const [backgroundColor] = useState<string>(() => randomColor({ luminosity: 'light' }));
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

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

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (editText.trim() !== '') {
      onUpdate(id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editText.trim() !== '') {
        onUpdate(id, editText);
      }
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setEditText(text);
      setIsEditing(false);
    } else if (e.key === ' ') {
      e.stopPropagation();
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 3000 }}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className='todo-sticker__item'
        onDoubleClick={handleDoubleClick}
      >
        {isEditing ? (
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            style={{ width: '100%', height: '100%' }}
          >
            <TextField
              multiline
              fullWidth
              variant='standard'
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              inputProps={{ spellCheck: 'false' }}
              sx={{
                '& .MuiInputBase-input': {
                  paddingBottom: '10px',
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#222',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#222',
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottomColor: '#222',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#222',
                },
              }}
            />
          </div>
        ) : (
          <p>{text}</p>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          top: position.y + (transform?.y || 0) + 5,
          left: position.x + (transform?.x || 0) + 220,
        }}
      >
        <button onClick={() => onDelete(id)} style={{ cursor: 'pointer' }}>
          <CloseIcon
            sx={{
              color: '#222',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#c00404',
              },
            }}
          />
        </button>
      </div>
    </div>
  );
};
