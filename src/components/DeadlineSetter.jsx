// src/components/DeadlineSetter.js
import { useState, useEffect } from 'react';
import useTechnologies from '../useTechnologies';

export default function DeadlineSetter() {
  const { technologies, updateDeadline } = useTechnologies();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTechId, setSelectedTechId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isExpanded && technologies.length > 0) {
      setSelectedTechId(technologies[0].id);
    }
  }, [isExpanded, technologies]);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!deadline) {
      setError('Пожалуйста, укажите дату.');
      return;
    }

    const selectedDate = new Date(deadline);
    const now = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    if (selectedDate < now) {
      setError('Срок не может быть в прошлом.');
      return;
    }

    updateDeadline(selectedTechId, deadline);
    setDeadline('');
  };

  if (technologies.length === 0) return null;

  return (
    <div className="card deadline-setter" role="region" aria-labelledby="deadline-toggle">
      <button
        type="button"
        id="deadline-toggle"
        className="deadline-toggle-btn"
        onClick={() => setIsExpanded(prev => !prev)}
        aria-expanded={isExpanded}
        aria-controls="deadline-form"
      >
        {isExpanded ? '🔽 Свернуть форму дедлайна' : '📅 Установить срок изучения'}
      </button>

      {isExpanded && (
        <form
          id="deadline-form"
          className="deadline-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {error && (
            <div className="error-message" role="alert">
              ❌ {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="tech-select-deadline">Технология</label>
            <select
              id="tech-select-deadline"
              value={selectedTechId}
              onChange={(e) => setSelectedTechId(Number(e.target.value))}
              aria-describedby={error ? 'deadline-error' : undefined}
            >
              {technologies.map(tech => (
                <option key={tech.id} value={tech.id}>
                  {tech.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="deadline-input">Срок изучения</label>
            <input
              type="date"
              id="deadline-input"
              value={deadline}
              min={today}
              onChange={(e) => setDeadline(e.target.value)}
              aria-invalid={!!error}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Установить срок
          </button>
        </form>
      )}
    </div>
  );
}