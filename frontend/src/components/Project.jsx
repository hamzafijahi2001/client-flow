import React from "react";
import { useNavigate } from "react-router-dom";


function Project({client_id , project, onDelete}) {

    const navigate = useNavigate()


    return <div className="project-container" onClick={() => navigate(`/clients/${client_id}/projects/${project.id}/tasks`)}>
        <p className="project-title">{project.title}</p>
        <p className="project-description">{project.description}</p>
        <p className="project-deadline">{project.deadline}</p>
        <button className="delete-button" onClick={()=> onDelete(project.id)}> delete </button>
        </div>
}

export default Project;