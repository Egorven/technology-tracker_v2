import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  { 
    id: 1, 
    title: 'React Components', 
    description: 'Изучение базовых компонентов', 
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  { 
    id: 2, 
    title: 'Node.js Basics', 
    description: 'Основы серверного JavaScript', 
    status: 'not-started',
    notes: '',
    category: 'backend'
  },
  {
    id: 3,
    title: 'HTML & Semantic Markup',
    description: 'Структура веб-страниц и семантические теги',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 4,
    title: 'CSS Flexbox & Grid',
    description: 'Современные методы вёрстки',
    status: 'not-started',
    notes: '',
    category: 'frontend'
  },
  {
    id: 5,
    title: 'Git & GitHub',
    description: 'Система контроля версий и коллаборация',
    status: 'not-started',
    notes: '',
    category: 'tools'
  }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);


  const getNextStatus = (currentStatus) => {
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
  };
  const cycleStatus = (techId) => {
    const tech = technologies.find(t => t.id === techId);
    if (tech) {
      const newStatus = getNextStatus(tech.status);
      updateStatus(techId, newStatus);
    }
  };

  const updateAllToCompleted = () => {
  setTechnologies(prev =>
    prev.map(tech => ({ ...tech, status: 'completed' }))
  );
};

const resetAllStatuses = () => {
  setTechnologies(prev =>
    prev.map(tech => ({ ...tech, status: 'not-started' }))
  );
};

  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  return {
    technologies,
    updateStatus,
    updateNotes,
      cycleStatus,
    updateAllToCompleted,
    resetAllStatuses,
    getNextStatus 
  };
}

export default useTechnologies;