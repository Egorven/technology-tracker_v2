import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './QuickActions';
import { useState } from 'react';
import useTechnologies from './useTechnologies';

function App() {
  const { technologies, cycleStatus, updateNotes, updateAllToCompleted, resetAllStatuses } = useTechnologies();

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
    <>
      <div className="technology-progress">
        <ProgressHeader technologies={technologies} />
        <QuickActions
          technologies={technologies}
          onUpdateAllStatus={updateAllToCompleted}
          onResetAll={resetAllStatuses}
        />
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск технологий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span>Найдено: {filteredTechnologies.length}</span>
      </div>

      <div className="technology-list">
        <h2>Список задач</h2>
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

        {filteredTechnologies.map(technology => (
          <TechnologyCard
            key={technology.id}
            id={technology.id}
            title={technology.title}
            description={technology.description}
            notes={technology.notes}
            status={technology.status}
            onUpdateStatus={cycleStatus}
            onNotesChange={updateNotes}
          />
        ))}
      </div>
    </>
  );
}

export default App;