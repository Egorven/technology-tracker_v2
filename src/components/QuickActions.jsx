import './QuickActions.css';
function QuickActions({ onUpdateAllStatus, onResetAll, onSelectRandom }) {
  return (
    <div className="quick-actions">
      <button onClick={onUpdateAllStatus}>
        Отметить все как выполненные
      </button>
      <button onClick={onResetAll}>
        Сбросить все статусы
      </button>
      <button onClick={onSelectRandom}>
        Случайный выбор следующей технологии
      </button>
    </div>
  );
}

export default QuickActions;