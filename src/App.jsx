// App.jsx
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import { useState, useEffect} from 'react';

function App() {

const [technologies, setTechnologies] = useState(() => {
  const saved = localStorage.getItem('techTrackerData');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Ошибка при загрузке из localStorage, используем начальные данные', e);
    }
  }
  //начальные данные
  return [
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed', notes: '' },
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress', notes: '' },
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '' }
  ];
});


useEffect(() => {
  localStorage.setItem('techTrackerData', JSON.stringify(technologies));
  console.log('Данные сохранены в localStorage');
}, [technologies]);
  const updateTechnologyNotes = (techId, newNotes) => { 
  setTechnologies(prevTech =>  
    prevTech.map(tech =>  
      tech.id === techId ? { ...tech, notes: newNotes } : tech 
    ) 
  ); 
}; 

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
            notes={technology.notes}
            status={technology.status}
            onUpdateStatus={updateTechnologyStatus}
            onNotesChange={updateTechnologyNotes}
          />
        ))}
      </div>
    </>
  );
}

export default App;