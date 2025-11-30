import './ProgressHeader.css';
import ProgressBar from './ProgressBar';

function ProgressHeader({ technologies }) {
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inprogress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notstarted = technologies.filter(tech => tech.status === 'not-started').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-header">
            <h2>Прогресс по дорожной карте</h2>
            <p>Всего технологий: {total}</p>
            <p>Изучено: {completed}</p>
            <p>В процессе: {inprogress}</p>
            <p>Не начато: {notstarted}</p>
<ProgressBar
        progress={percentage}
        label="Общий прогресс изучения"
        color="#4CAF50"
        height={24}
        showPercentage={true}
        animated={true}
      />
    </div>
    );
}

export default ProgressHeader;