import { useNavigate } from "react-router-dom";

function Project({ client_id, project, onDelete }) {
  const statusMap = {
    1: "Planning",
    2: "Active",
    3: "Done",
  };
  
  const navigate = useNavigate();
  const statusName = statusMap[project.status] || "Unknown";

  return (
    <div
      className="project-container"
      onClick={() => navigate(`/clients/${client_id}/projects/${project.id}/tasks`)}
    >
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <span className={`project-status status-${statusName.toLowerCase()}`}>
          {statusName}
        </span>
      </div>
      
      <div className="project-description-box">
        <p>{project.description}</p>
      </div>
      
      <div className="project-footer">
        <div className="project-deadline">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {new Date(project.deadline).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </div>
        
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Project;
