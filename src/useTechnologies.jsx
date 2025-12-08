import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    originCountry: 'United States',
     deadline: ''
  },
  {
    id: 2,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend',
    originCountry: 'United States',
     deadline: ''
  },
  {
    id: 3,
    title: 'HTML & Semantic Markup',
    description: 'Структура веб-страниц и семантические теги',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    originCountry: 'United States',
     deadline: ''
  },
  {
    id: 4,
    title: 'CSS Flexbox & Grid',
    description: 'Современные методы вёрстки',
    status: 'not-started',
    notes: '',
    category: 'frontend',
    originCountry: 'United States',
     deadline: ''
  },
  {
    id: 5,
    title: 'Git & GitHub',
    description: 'Система контроля версий и коллаборация',
    status: 'not-started',
    notes: '',
    category: 'tools',
    originCountry: 'United States',
     deadline: ''
  },
  {
    id: 6,
    title: 'Python',
    description: 'Универсальный язык программирования',
    status: 'not-started',
    notes: '',
    category: 'language',
    originCountry: 'Netherlands',
     deadline: ''
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

const updateStatus = (id, newStatus) => {
  setTechnologies(prev => {
    const next = prev.map(tech =>
      tech.id === id ? { ...tech, status: newStatus } : tech
    );
    return next;
  });
};

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };
  const replaceTechnologies = (newTechnologies) => {
    setTechnologies(newTechnologies);
  };
  const updateStatusBulk = (ids, newStatus) => {
  const idSet = new Set(ids);
  setTechnologies(prev =>
    prev.map(tech =>
      idSet.has(tech.id) ? { ...tech, status: newStatus } : tech
    )
  );
};
const updateDeadline = (id, newDeadline) => {
  setTechnologies(prev =>
  prev.map(tech =>
    tech.id === id ? { ...tech, deadline: newDeadline } : tech
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
    getNextStatus,
    replaceTechnologies,
    updateStatusBulk,
     updateDeadline
  };
}

export default useTechnologies;