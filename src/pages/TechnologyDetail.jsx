// src/pages/TechnologyDetail.js
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../useTechnologies';
import useCountryInfo from '../hooks/useCountryInfo';

export default function TechnologyDetail() {
  const { techId } = useParams();
  const { technologies, updateStatus, updateNotes } = useTechnologies();

  const technology = technologies.find(t => t.id === parseInt(techId));
  const [notes, setNotes] = useState('');

  const countryName = technology?.originCountry || null;
  const { data: country, loading, error } = useCountryInfo(countryName);

  useEffect(() => {
    if (technology) {
      setNotes(technology.notes || '');
    }
  }, [technology]);

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  const handleNotesBlur = () => {
    updateNotes(technology.id, notes);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-detail">
        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        {countryName && (
          <div className="detail-section">
            <h3>Страна происхождения</h3>
            {loading && <p>Загрузка данных о стране...</p>}
            {error && <p className="text-error">⚠️ {error}</p>}
            {country && (
              <div>
                <img
                  src={country.flags.png.trim()}
                  alt={`Флаг ${country.name.common}`}
                  style={{ width: '40px', marginRight: '10px', verticalAlign: 'middle' }}
                />
                <strong>{country.name.common}</strong><br />
                Столица: {country.capital?.[0] || '—'}<br />
                Население: {country.population?.toLocaleString() || '—'}<br />
                Язык(и): {Object.values(country.languages || {}).join(', ')}
              </div>
            )}
          </div>
        )}

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            <button
              onClick={() => updateStatus(technology.id, 'not-started')}
              className={technology.status === 'not-started' ? 'active' : ''}
            >
              Не начато
            </button>
            <button
              onClick={() => updateStatus(technology.id, 'in-progress')}
              className={technology.status === 'in-progress' ? 'active' : ''}
            >
              В процессе
            </button>
            <button
              onClick={() => updateStatus(technology.id, 'completed')}
              className={technology.status === 'completed' ? 'active' : ''}
            >
              Завершено
            </button>
          </div>
        </div>

        <div className="detail-section">
          <h3>Мои заметки</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleNotesBlur}
            placeholder="..."
            rows="5"
            className="notes-textarea"
          />
        </div>
      </div>
    </div>
  );
}