import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { v4 as uuidv4 } from 'uuid';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { PiPlusCircleBold, PiMoonStarsFill, PiSunDimFill } from 'react-icons/pi';

import { getTasks, saveTasks } from '../services/localStorage';
import { useTheme } from '../hooks/useTheme';

import { Task } from '../types/types';

import { DraggableNote } from '../components/DraggableNote/DraggableNote';
import { AddStickerInput } from '../components/AddStickerInput/AddStickerInput';

import { getRandomColor, LIGHT_THEME_COLORS, DARK_THEME_COLORS } from '../styles/colors';
import { lightTheme, darkTheme } from '../styles/theme';
import './App.css';

export const App = () => {
  const { theme, isDarkTheme, toggleTheme } = useTheme();
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleThemeToggle = () => {
    const newIsDarkTheme = !isDarkTheme;
    
    const updatedTasks = tasks.map(task => {
      if (task.isColorSetByUser) {
        return task;
      }

      const currentColors = newIsDarkTheme ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
      const oppositeColors = newIsDarkTheme ? LIGHT_THEME_COLORS : DARK_THEME_COLORS;
      
      if (oppositeColors.includes(task.color)) {
        const index = oppositeColors.indexOf(task.color);
        return {
          ...task,
          color: currentColors[index] || currentColors[0],
          isColorSetByUser: false
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    toggleTheme();
  };

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

      setTasks([...tasks, { 
        id: uuidv4(), 
        text: task, 
        position: { x: randomX, y: randomY },
        color: getRandomColor(isDarkTheme),
        isColorSetByUser: false
      }]);
      setTask('');
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log(tasks);
  };

  const handleUpdateTask = (id: string, newText: string, newColor?: string) => {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return { 
          ...task, 
          text: newText,
          ...(newColor ? { color: newColor, isColorSetByUser: true } : {})
        };
      }
      return task;
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <ThemeProvider theme={currentTheme}>
      <div className='todo-sticker' style={{ backgroundColor: theme.primary }}>
        <div className='todo-sticker__controls'>
          <AddStickerInput
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            label="Add a new sticker"
          />
          <button 
            onClick={handleAddTask}
            style={{ color: theme.text }}
          >
            <PiPlusCircleBold size={24} />
          </button>
          <button 
            className='todo-sticker__theme-button' 
            onClick={handleThemeToggle}
            style={{ color: theme.text }}
          >
            {isDarkTheme ? (
              <PiSunDimFill size={24} />
            ) : (
              <PiMoonStarsFill size={24} />
            )}
          </button>
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <div className='todo-sticker__container'>
            {tasks.map((task) => (
              <DraggableNote
                key={task.id}
                {...task}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
                theme={theme}
                isDarkTheme={isDarkTheme}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </ThemeProvider>
  );
};
