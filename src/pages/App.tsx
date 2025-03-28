import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { TextField } from '@mui/material';
import PlusIcon from '@mui/icons-material/Add';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { getTasks, saveTasks } from '../services/localStorage';
import { useTheme } from '../hooks/useTheme';
import { Task } from '../types/theme';
import { DraggableNote } from '../components/DraggableNote/DraggableNote';
import { createMuiStyles } from '../styles/mui-styles';
import './App.css';

export const App = () => {
  const { theme, isDarkTheme, toggleTheme } = useTheme();
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>(getTasks());

  const muiStyles = useMemo(() => createMuiStyles(theme), [theme]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

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

  const handleUpdateTask = (id: string, newText: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
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

  return (
    <div className='todo-sticker' style={{ backgroundColor: theme.primary }}>
      <div className='todo-sticker__controls'>
        <TextField
          sx={muiStyles.addNoteTextField}
          variant='standard'
          label='Add a new sticker'
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button onClick={handleAddTask}>
          <PlusIcon sx={muiStyles.addButton} />
        </button>
        <button onClick={toggleTheme}>
          {isDarkTheme ? (
            <LightModeIcon sx={muiStyles.addButton} />
          ) : (
            <DarkModeIcon sx={muiStyles.addButton} />
          )}
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
              theme={theme}
              isDarkTheme={isDarkTheme}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};
