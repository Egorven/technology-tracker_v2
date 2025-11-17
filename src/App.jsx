// App.jsx
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import { useState } from 'react';

function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов',
      status: 'completed'
    },
    {
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX', 
      status: 'in-progress'
    },
    {
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов', 
      status: 'not-started'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter === 'all') return true;
    return tech.status === activeFilter;
  });
  
  const updateTechnologyStatus = (id) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech =>
        tech.id === id
          ? { ...tech, status: getNextStatus(tech.status) }
          : tech
      )
    );
  };

  const getNextStatus = (currentStatus) => {
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
  };

  const updateAllToCompleted = () => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const selectRandomTechnology = () => {
    const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started');
    if (notStartedTechnologies.length > 0) {
      const randomIndex = Math.floor(Math.random() * notStartedTechnologies.length);
      const randomTech = notStartedTechnologies[randomIndex];
      alert(`Следующая технология для изучения: ${randomTech.title}`);
    } else {
      alert('Все технологии уже начаты или завершены!');
    }
  };

  return (
    <>
      <div className="technology-progress">
        <ProgressHeader technologies={technologies} />
        <QuickActions 
          technologies={technologies}
          onUpdateAllStatus={updateAllToCompleted}
          onResetAll={resetAllStatuses}
          onSelectRandom={selectRandomTechnology}
        />
      </div>
      <div className="technology-list">
        <h2>Список задач</h2>
         <div className="filter-buttons">
          <button 
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => setActiveFilter('all')}
          >
            Все технологии
          </button>
          <button 
            className={activeFilter === 'not-started' ? 'active' : ''}
            onClick={() => setActiveFilter('not-started')}
          >
            Не начатые
          </button>
          <button 
            className={activeFilter === 'in-progress' ? 'active' : ''}
            onClick={() => setActiveFilter('in-progress')}
          >
            В процессе
          </button>
          <button 
            className={activeFilter === 'completed' ? 'active' : ''}
            onClick={() => setActiveFilter('completed')}
          >
            Выполненные
          </button>
        </div>
        {filteredTechnologies.map(technology => (
          <TechnologyCard
            key={technology.id}
            id={technology.id}
            title={technology.title}
            description={technology.description}
            status={technology.status}
            onUpdateStatus={updateTechnologyStatus}
          />
        ))}
      </div>
    </>
  );
}

export default App;