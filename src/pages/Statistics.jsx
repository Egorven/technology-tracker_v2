// src/pages/Statistics.js
import { useMemo } from 'react';
import useTechnologies from '../useTechnologies';

export default function Statistics() {
  const { technologies } = useTechnologies();

  const stats = useMemo(() => {
    const total = technologies.length;
    const notStarted = technologies.filter(t => t.status === 'not-started').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const completed = technologies.filter(t => t.status === 'completed').length;

    return { total, notStarted, inProgress, completed };
  }, [technologies]);

  const percentage = (count) => stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

  return (
    <div className="page">
      <h1>Статистика</h1>

      {stats.total === 0 ? (
        <p className="empty-state">Нет данных для отображения статистики.</p>
      ) : (
        <div className="statistics-grid">
          <div className="stat-card">
            <h3>Всего технологий</h3>
            <p className="stat-number">{stats.total}</p>
          </div>

          <div className="stat-card">
            <h3>Завершено</h3>
            <div className="progress-bar">
              <div
                className="progress-fill completed"
                style={{ width: `${percentage(stats.completed)}%` }}
              ></div>
            </div>
            <p>{stats.completed} ({percentage(stats.completed)}%)</p>
          </div>

          <div className="stat-card">
            <h3>В процессе</h3>
            <div className="progress-bar">
              <div
                className="progress-fill in-progress"
                style={{ width: `${percentage(stats.inProgress)}%` }}
              ></div>
            </div>
            <p>{stats.inProgress} ({percentage(stats.inProgress)}%)</p>
          </div>

          <div className="stat-card">
            <h3>Не начато</h3>
            <div className="progress-bar">
              <div
                className="progress-fill not-started"
                style={{ width: `${percentage(stats.notStarted)}%` }}
              ></div>
            </div>
            <p>{stats.notStarted} ({percentage(stats.notStarted)}%)</p>
          </div>
        </div>
      )}
    </div>
  );
}