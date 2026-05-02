import React from "react";


function Task({task, onDelete}) {

        const priorityMap = {
            1: "Must Have",
            2: "Should Have",
            3: "Could Have",
            4: "Won't Have"
        };


    return <div className="task-container">
        <p className="task-title">{task.title}</p>
        <p className="task-description">{task.description}</p>
        <p className="task-deadline">{task.deadline}</p>
        <p className="task-priority">{priorityMap[task.priority]}</p>
        <button className="delete-button" onClick={()=> onDelete(task.id)}> delete </button>
        </div>
}

export default Task;