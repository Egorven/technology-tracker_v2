// src/pages/Settings.js
export default function Settings() {

  const username = localStorage.getItem('username') || 'Гость';

  return (
    <div className="page">
      <h1>Настройки</h1>

      <div className="settings-section">
        <h2>Аккаунт</h2>
        <p>Текущий пользователь: <strong>{username}</strong></p>
      </div>
    </div>
  );
}