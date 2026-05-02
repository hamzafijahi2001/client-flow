import React from "react";


function Task({task, onDelete}) {


    return <div className="project-container">
        <p className="project-title">{task.title}</p>
        <p className="task-description">{task.description}</p>
        <p className="task-deadline">{task.deadline}</p>
        <button className="delete-button" onClick={()=> onDelete(task.id)}> delete </button>
        </div>
}

export default Task;