import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onUpdateStatus }) {
  const cardClass = `technology-card status-${status}`;
  const statusIconClass = `status-icon status-${status}`;

  const handleClick = () => {
    onUpdateStatus(id);
  };

  return (
    <div className={cardClass} onClick={handleClick}>
      <div className="technology-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <p><span className={statusIconClass}></span>{status}</p>
      </div>
    </div>
  );
}

export default TechnologyCard;