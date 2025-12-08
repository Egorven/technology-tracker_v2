import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

import { NotificationProvider, useNotification } from './components/NotificationBar';

import './App.css';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('username') || '';
    setIsLoggedIn(loggedIn);
    setUsername(user);
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', user);
    setIsLoggedIn(true);
    setUsername(user);
    showNotification({
      type: 'success',
      title: 'Успешный вход',
      message: `Добро пожаловать, ${user}!`,
    });
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    showNotification({
      type: 'info',
      title: 'Выход выполнен',
      message: 'Вы успешно вышли из аккаунта.',
    });
    navigate('/');
  };

  return (
    <div className="app">
      <Navigation isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/technologies" element={<TechnologyList />} />
          <Route path="/technology/:techId" element={<TechnologyDetail />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

export default App;