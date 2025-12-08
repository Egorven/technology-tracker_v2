import { Link } from 'react-router-dom';
import { useState} from 'react';
import useTechnologies from '../useTechnologies';
import QuickActions from '../components/QuickActions';
import BulkStatusEditor from '../components/BulkStatusEditor';
import DeadlineSetter from '../components/DeadlineSetter';

export default function TechnologyList() {
const { technologies, updateStatusBulk, cycleStatus, updateAllToCompleted, resetAllStatuses } = useTechnologies();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = searchQuery
      ? tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesFilter = activeFilter === 'all'
      ? true
      : tech.status === activeFilter;

    return matchesSearch && matchesFilter;
    
  });

  return (
    <div className="page">
      <QuickActions
        onUpdateAllStatus={updateAllToCompleted}
        onResetAll={resetAllStatuses}
        technologies={technologies}
      />
      <BulkStatusEditor
  technologies={filteredTechnologies}
  onUpdateStatusBulk={updateStatusBulk}
/>
<DeadlineSetter />

      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {filteredTechnologies.length}</span>
      </div>

      <div className="filter-buttons">
        {['all', 'not-started', 'in-progress', 'completed'].map(filter => (
          <button
            key={filter}
            className={activeFilter === filter ? 'active' : ''}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === 'all' ? 'Все технологии' :
             filter === 'not-started' ? 'Не начатые' :
             filter === 'in-progress' ? 'В процессе' : 'Выполненные'}
          </button>
        ))}
      </div>

      <div className="page-header">
        <h1>Все технологии</h1>
      </div>

     <div className="technologies-grid">
  {filteredTechnologies.map(tech => (
    <div key={tech.id} className="technology-item">
      <h3>{tech.title}</h3>
      <p>{tech.description}</p>
      {tech.deadline && (
  <div className="tech-deadline">
    📅 Дедлайн: <strong>{new Date(tech.deadline).toLocaleDateString('ru-RU')}</strong>
  </div>

)}
      <div className="technology-meta">
        <span
          className={`status status-${tech.status} clickable`}
          onClick={() => cycleStatus(tech.id)}
          style={{ cursor: 'pointer', padding: '0.25rem 0.5rem' }}
        >
          {tech.status === 'not-started' ? 'Не начато' :
           tech.status === 'in-progress' ? 'В процессе' : 'Завершено'}
        </span>
        <Link to={`/technology/${tech.id}`} className="btn-link">
          Подробнее →
        </Link>
      </div>
    </div>
  ))}
</div>

      {filteredTechnologies.length === 0 && (
        <div className="empty-state">
          <p>
            {technologies.length === 0
              ? 'Технологий пока нет.'
              : 'Ничего не найдено по вашему запросу.'}
          </p>
        </div>
      )}
    </div>
  );
}