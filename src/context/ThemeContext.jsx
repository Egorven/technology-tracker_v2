// src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used within a ThemeProvider');
  return context;
};

// Функция для применения CSS-переменных
const applyThemeToDocument = (mode) => {
  if (mode === 'dark') {
    document.documentElement.style.setProperty('--bg-color', '#121212');
    document.documentElement.style.setProperty('--paper-color', '#1e1e1e');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--navbar-bg', '#1a237e'); /* тёмно-синий */
    document.documentElement.style.setProperty('--navbar-text', '#ffffff');
    document.documentElement.style.setProperty('--border-color', '#444');
    document.documentElement.style.setProperty('--border-light', '#333');
    document.documentElement.style.setProperty('--shadow-light', 'rgba(0, 0, 0, 0.3)');
    document.documentElement.style.setProperty('--shadow-medium', 'rgba(0, 0, 0, 0.5)');
  } else {
    // светлая тема — значения по умолчанию (уже в :root)
    document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
    document.documentElement.style.setProperty('--paper-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#333333');
    document.documentElement.style.setProperty('--navbar-bg', '#2c3e50');
    document.documentElement.style.setProperty('--navbar-text', '#ecf0f1');
    document.documentElement.style.setProperty('--border-color', '#ddd');
    document.documentElement.style.setProperty('--border-light', '#eee');
    document.documentElement.style.setProperty('--shadow-light', 'rgba(0, 0, 0, 0.05)');
    document.documentElement.style.setProperty('--shadow-medium', 'rgba(0, 0, 0, 0.1)');
  }
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'dark' || savedMode === 'light') {
      setMode(savedMode);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  useEffect(() => {
    applyThemeToDocument(mode);
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#1976d2' },
            background: { default: '#ffffff', paper: '#f5f5f5' },
            text: { primary: '#333333' },
          }
        : {
            primary: { main: '#90caf9' },
            background: { default: '#121212', paper: '#1e1e1e' },
            text: { primary: '#ffffff' },
          }),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};