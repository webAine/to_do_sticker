import { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';

import { v4 as uuidv4 } from 'uuid';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { PiPlusCircleBold } from 'react-icons/pi';

import { getTasks, saveTasks } from '../services/localStorage';
import { useTheme } from '../hooks/useTheme';

import { Task } from '../types/types';

import Header from '../components/Header/Header';
import { DraggableNote } from '../components/DraggableNote/DraggableNote';
import { AddStickerInput } from '../components/AddStickerInput/AddStickerInput';
import ZoomableContainer from '../components/ZoomableContainer/ZoomableContainer';

import { getRandomColor, LIGHT_THEME_COLORS, DARK_THEME_COLORS } from '../styles/colors';
import { lightTheme, darkTheme } from '../styles/theme';
import './App.css';

export const App = () => {
  const { theme, isDarkTheme, toggleTheme } = useTheme();
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [scale, setScale] = useState(1);
  const currentTheme = isDarkTheme ? darkTheme : lightTheme;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleThemeToggle = () => {
    const newIsDarkTheme = !isDarkTheme;

    const updatedTasks = tasks.map((task) => {
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
          isColorSetByUser: false,
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
      const baseWidth = 2000;
      const baseHeight = 1500;
      const padding = 20;

      const randomX = Math.floor(padding + Math.random() * (baseWidth - noteWidth - padding * 2));
      const randomY = Math.floor(
        padding + controlsHeight + Math.random() * (baseHeight - noteHeight - padding * 2)
      );

      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          text: task,
          position: { x: randomX, y: randomY },
          color: getRandomColor(isDarkTheme),
          isColorSetByUser: false,
        },
      ]);
      setTask('');
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log(tasks);
  };

  const handleUpdateTask = (id: string, newText: string, newColor?: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            text: newText,
            ...(newColor ? { color: newColor, isColorSetByUser: true } : {}),
          };
        }
        return task;
      })
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleZoomChange = (newScale: number) => {
    setScale(newScale);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    const scaledDeltaX = delta.x / scale;
    const scaledDeltaY = delta.y / scale;

    setTasks(
      tasks.map((task) => {
        if (task.id === active.id) {
          return {
            ...task,
            position: {
              x: task.position.x + scaledDeltaX,
              y: task.position.y + scaledDeltaY,
            },
          };
        }
        return task;
      })
    );
  };

  const handleBlurInput = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <div
        className='app'
        style={{ backgroundColor: theme.primary, transition: 'background-color 0.3s ease' }}
      >
      <Header 
        handleThemeToggle={handleThemeToggle} 
        isDarkTheme={isDarkTheme}
        textColor={theme.text}
      />
        <ZoomableContainer 
          onZoomChange={handleZoomChange}
          onBackgroundClick={handleBlurInput}
        >
          <div className='todo-sticker' style={{ backgroundColor: theme.primary }}>
            <div className='todo-sticker__controls'>
              <AddStickerInput
                ref={inputRef}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyDown}
                label='Add a new sticker'
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddTask();
                }} 
                style={{ color: theme.text }}
              >
                <PiPlusCircleBold size={24} />
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
        </ZoomableContainer>
      </div>
    </ThemeProvider>
  );
};
