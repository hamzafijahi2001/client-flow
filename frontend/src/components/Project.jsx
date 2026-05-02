import React from "react";


function Project({project, onDelete}) {


    return <div className="project-container">
        <p className="project-title">{project.title}</p>
        <p className="project-description">{project.description}</p>
        <p className="project-deadline">{project.deadline}</p>
        <button className="delete-button" onClick={()=> onDelete(project.id)}> delete </button>
        </div>
}

export default Project;