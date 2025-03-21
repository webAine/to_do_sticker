import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { DraggableNote } from './components/DraggableNote/DraggableNote';
import { TextField } from '@mui/material';
import PlusIcon from '@mui/icons-material/Add';
import './App.css';

export interface Task {
  id: string;
  text: string;
  position: { x: number; y: number };
}

export const App = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks
        ? JSON.parse(savedTasks)
        : [
            { id: uuidv4(), text: 'Example task 1', position: { x: 100, y: 100 } },
            { id: uuidv4(), text: 'Example task 2', position: { x: 200, y: 200 } },
            { id: uuidv4(), text: 'Example task 3', position: { x: 300, y: 300 } },
          ];
    } catch (error) {
      console.error('Ошибка при чтении из localStorage:', error);
      return [];
    }
  });

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const controlsHeight = 60;
      const noteWidth = 250;
      const noteHeight = 80;
      const availableWidth = window.innerWidth - noteWidth;
      const availableHeight = window.innerHeight - noteHeight - controlsHeight;
      const padding = 20;
      const randomX = Math.floor(padding + Math.random() * (availableWidth - padding * 2));
      const randomY = Math.floor(
        padding + controlsHeight + Math.random() * (availableHeight - padding * 2)
      );

      setTasks([...tasks, { id: uuidv4(), text: task, position: { x: randomX, y: randomY } }]);
      setTask('');
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log(tasks);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setTasks(
      tasks.map((task) => {
        if (task.id === active.id) {
          return {
            ...task,
            position: {
              x: task.position.x + delta.x,
              y: task.position.y + delta.y,
            },
          };
        }
        return task;
      })
    );
  };

  const handleUpdateTask = (id: string, newText: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className='todo-sticker'>
      <div className='todo-sticker__controls'>
        <TextField
          sx={{
            width: '350px',
            '& .MuiInputLabel-root': {
              color: '#808080',
            },
            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
              color: '#FFFFF0',
            },
            '& .MuiInputBase-input': {
              color: '#FFFFF0',
            },
            '& .MuiInput-underline:before': {
              borderBottomColor: '#FFFFF0',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottomColor: '#FFFFF0',
            },
            '& .MuiInput-underline:hover:before': {
              borderBottomColor: '#FFFFF0',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#FFFFF0',
            },
          }}
          variant='standard'
          label='Add a new sticker'
          multiline
          maxRows={4}
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTask();
            }
          }}
        />
        <button className='todo-sticker__button' onClick={handleAddTask}>
          <PlusIcon
            sx={{
              color: '#808080',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#FFFFF0',
              },
            }}
          />
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className='todo-sticker__container'>
          {tasks.map((task) => (
            <DraggableNote
              key={task.id}
              id={task.id}
              text={task.text}
              position={task.position}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};
