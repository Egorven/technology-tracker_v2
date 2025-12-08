// src/components/Navigation.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useThemeContext } from '../context/ThemeContext'; // ← Исправь путь, если нужно
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, useMediaQuery } from '@mui/material';

function Navigation({ isLoggedIn, username, onLogout }) {
  const location = useLocation();
  const { mode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery('(max-width:768px)'); // MUI хук для адаптива

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Закрывать мобильное меню при клике по ссылке
  const handleNavClick = () => {
    if (isMobile) setIsMenuOpen(false);
  };

  // Закрывать меню при клике вне (только на мобильных)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen, isMobile]);

  return (
    <nav className="navbar">
      <div className="navbar-container" ref={menuRef}>
        {/* Логотип */}
        <div className="navbar-brand">
          <Link to="/" onClick={handleNavClick}>
            <span className="logo">🚀</span>
            <span className="brand-name">Трекер технологий</span>
          </Link>
        </div>

        {/* Переключатель темы — виден всегда */}
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          aria-label={`Переключить на ${mode === 'light' ? 'тёмную' : 'светлую'} тему`}
          sx={{ ml: 1 }}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* Мобильная кнопка меню */}
        {isMobile && (
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span>☰</span>
          </button>
        )}

        {/* Основное меню */}
        <ul className={`nav-menu ${isMobile && isMenuOpen ? 'active' : ''} ${!isMobile ? 'desktop' : ''}`}>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={handleNavClick}>
              Главная
            </Link>
          </li>
          <li>
            <Link to="/technologies" className={isActive('/technologies') ? 'active' : ''} onClick={handleNavClick}>
              Все технологии
            </Link>
          </li>
          <li>
            <Link to="/statistics" className={isActive('/statistics') ? 'active' : ''} onClick={handleNavClick}>
              Статистика
            </Link>
          </li>
          <li>
            <Link to="/settings" className={isActive('/settings') ? 'active' : ''} onClick={handleNavClick}>
              Настройки
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''} onClick={handleNavClick}>
                  Панель
                </Link>
              </li>
              <li className="nav-user">
                <span className="username">Привет, {username}!</span>
                <button onClick={onLogout} className="btn-logout">
                  Выйти
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={isActive('/login') ? 'active' : ''} onClick={handleNavClick}>
                Войти
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;