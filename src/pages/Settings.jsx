// src/pages/Settings.js
import useTechnologies from '../useTechnologies'; // ← УБРАЛ {}
import DataExporter from '../components/DataExporter';
import DataImporter from '../components/DataImporter';

export default function Settings() {
  const username = localStorage.getItem('username') || 'Гость';
  const { technologies, replaceTechnologies } = useTechnologies(); // ← теперь работает

  const handleImport = (importedTechnologies) => {
    replaceTechnologies(importedTechnologies);
    alert('✅ Данные успешно импортированы!');
  };

  return (
    <div className="page">
      <h1>Настройки</h1>
      
      <div className="settings-section">
        <h2>Аккаунт</h2>
        <p>Текущий пользователь: <strong>{username}</strong></p>
      </div>

      <hr className="section-divider" />

      <div className="settings-section">
        <DataImporter onImport={handleImport} />
      </div>

      <hr className="section-divider" />

      <div className="settings-section">
        <DataExporter technologies={technologies} />
      </div>
    </div>
  );
}