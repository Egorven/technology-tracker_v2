import './ProgressHeader.css';

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
             <p>Процент изучения</p>
            <div className="progress-bar-container">
                <div className="progress-bar">
                    <div 
                        className="progress-bar-fill" 
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <span>{percentage}%</span>
            </div>
        </div>
    );
}

export default ProgressHeader;