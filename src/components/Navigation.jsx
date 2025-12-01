// src/components/Navigation.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navigation({ isLoggedIn, username, onLogout }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Логотип и название */}
        <div className="navbar-brand">
          <Link to="/">
            <span className="logo">🚀</span>
            <span className="brand-name">Трекер технологий</span>
          </Link>
        </div>

        {/* Мобильная кнопка меню */}
        <button className="menu-toggle" onClick={toggleMenu}>
          <span>☰</span>
        </button>

        {/* Основное меню */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Главная
            </Link>
          </li>
          <li>
            <Link to="/technologies" className={isActive('/technologies') ? 'active' : ''}>
              Все технологии
            </Link>
          </li>
          <li>
            <Link to="/statistics" className={isActive('/statistics') ? 'active' : ''}>
              Статистика
            </Link>
          </li>
          <li>
            <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
              Настройки
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
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
              <Link to="/login" className={isActive('/login') ? 'active' : ''}>
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