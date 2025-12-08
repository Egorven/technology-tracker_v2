// src/components/BulkStatusEditor.js
import { useState } from 'react';

export default function BulkStatusEditor({ technologies, onUpdateStatusBulk }) {
  const [isExpanded, setIsExpanded] = useState(false); // управляет видимостью содержимого
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [newStatus, setNewStatus] = useState('in-progress');

  const toggleSelection = (id) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const applyBulkUpdate = () => {
    if (selectedIds.size === 0) return;
    onUpdateStatusBulk(Array.from(selectedIds), newStatus);
    setSelectedIds(new Set());
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'not-started': return 'Не начато';
      case 'in-progress': return 'В процессе';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  const getCountLabel = (count) => {
    if (count === 1) return 'технологии';
    if (count >= 2 && count <= 4) return 'технологиям';
    return 'технологиям';
  };

  return (
    <div className="bulk-status-editor card" role="region" aria-labelledby="bulk-toggle">
      <button
        type="button"
        id="bulk-toggle"
        className="bulk-toggle-btn"
        onClick={() => setIsExpanded(prev => !prev)}
        aria-expanded={isExpanded}
        aria-controls="bulk-content"
      >
        {isExpanded ? '🔽 Свернуть массовое редактирование' : '▶️ Развернуть массовое редактирование'}
      </button>
      {isExpanded && (
        <div id="bulk-content" className="bulk-content">
          <div className="tech-list-bulk">
            {technologies.map(tech => (
              <label
                key={tech.id}
                className={`tech-checkbox-item ${selectedIds.has(tech.id) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.has(tech.id)}
                  onChange={() => toggleSelection(tech.id)}
                  aria-label={`Выбрать технологию: ${tech.title}`}
                />
                <span>{tech.title}</span>
                <span className={`status-badge status-${tech.status}`}>
                  {getStatusLabel(tech.status)}
                </span>
              </label>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="bulk-new-status">Новый статус</label>
            <select
              id="bulk-new-status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="not-started">Не начато</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершено</option>
            </select>
          </div>

          <button
            type="button"
            onClick={applyBulkUpdate}
            disabled={selectedIds.size === 0}
            className="btn btn-primary"
            aria-disabled={selectedIds.size === 0}
          >
            Применить к {selectedIds.size} {getCountLabel(selectedIds.size)}
          </button>
        </div>
      )}
    </div>
  );
}