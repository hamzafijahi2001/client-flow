import Project from "../components/Project";
import { useState,useEffect } from "react";
import api from "../api";
import "../styles/Project.css"
import { useParams } from "react-router-dom";

function Projects({client}){
    const {clientId} = useParams();
    const [projects,setProjects] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")

    const getProject = () => {
        api.get(`/api/clients/${clientId}/projects/`)
        .then((res) => res.data)
        .then((data)=> {setProjects(data);console.log(data);})
        .catch((err)=>alert(err))
    } 
    useEffect(()=>{
        getProject();
    },[clientId])

    const deleteProject = (id) => {
        api.delete(`/api/clients/${clientId}/project/delete/${id}/`)
        .then((res)=>{
            if(res.status===204){ alert("Project deleted!")
            getProject();}
            else alert("Failed to delete project")
        }).catch((err)=> alert(err))
        
    }

    const createProject = (e) =>{
        e.preventDefault()
        api.post(`/api/clients/${clientId}/projects/`,{ title , description, deadline })
        .then((res)=>{
            if(res.status === 201){ alert("Project Created!");
                    getProject(); }
            else alert("Failed to create project")
        })
        .catch((err)=> alert(err));
           
    }

    return( <div>
        
        <h2>Create a Project</h2>
        <form onSubmit={createProject}>
            <label htmlFor="title">title:</label>
        <br />
        <input type="text" id="title" name="title" required onChange={(e)=>setTitle(e.target.value)} value={title}></input>
        <label htmlFor="content">description:</label>
        <br/>
        <input type="text" id="description" name="description" required value={description} onChange={(e)=>setDescription(e.target.value)}></input>
        <label htmlFor="content">deadline:</label>
        <br />
        <input type="datetime-local" id="deadline" name="deadline" required value={deadline} onChange={(e)=>setDeadline(e.target.value)}></input>
        <br />
        <input type="submit" value="Submit"></input>
        </form>
        <div>
            <h2>Project</h2>
            {projects.map((project)=><Project client_id={clientId} project={project} onDelete={deleteProject} key={project.id}></Project>)}

        </div>
    </div>)
}
export default Projects;