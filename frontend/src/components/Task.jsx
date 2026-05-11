function Task({ task, onDelete }) {
  const priorityMap = {
    1: "Must Have",
    2: "Should Have",
    3: "Could Have",
    4: "Won't Have",
  };

  const priorityName = priorityMap[task.priority] || "Unprioritized";
  const priorityClass = String(priorityName).toLowerCase().replaceAll(" ", "-").replace("'", "");

  return (
    <tr className="task-row">
      <td className="task-main-cell">
        <div className="task-header">
          <p className="task-title">{task.title}</p>
          <span className={`task-priority priority-${priorityClass}`}>
            {priorityName}
          </span>
        </div>
        <div className="task-description-box">
          <p>{task.description}</p>
        </div>
      </td>
      <td className="task-deadline-cell">
        <div className="deadline-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          {new Date(task.deadline).toLocaleDateString()}
        </div>
      </td>
      <td className="task-action-cell">
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Task;
