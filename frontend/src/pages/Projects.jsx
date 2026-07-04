import Project from "../components/Project";
import { useState,useEffect,useCallback } from "react";
import api from "../api";
import "../styles/Project.css"
import { Link, useParams } from "react-router-dom";

function Projects(){
    const {clientId} = useParams();
    const [projects,setProjects] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")
    const [status, setStatus] = useState(1)
    const [showCreateForm, setShowCreateForm] = useState(false)

    const getProject = useCallback(() => {
        api.get(`/api/clients/${clientId}/projects/`)
        .then((res) => res.data)
        .then((data)=> {setProjects(data);console.log(data);})
        .catch((err)=>alert(err))
    }, [clientId])
    useEffect(()=>{
        getProject();
    },[getProject])

    const deleteProject = (id) => {
        api.delete(`/api/clients/${clientId}/project/delete/${id}/`)
        .then((res)=>{
            if(res.status===204){ 
            getProject();}
            else alert("Failed to delete project")
        }).catch((err)=> alert(err))
        
    }

    const createProject = (e) =>{
        e.preventDefault()
        api.post(`/api/clients/${clientId}/projects/`,{ title , description, deadline, status })
        .then((res)=>{
            if(res.status === 201){ 
                    setTitle("");
                    setDescription("");
                    setDeadline("");
                    setStatus(1);
                    setShowCreateForm(false);
                    getProject(); }
            else alert("Failed to create project")
        })
        .catch((err)=> alert(err));
           
    }

    return( <main className="projects-page app-shell">
        <section className="page-hero">
            <div>
                <h1>Projects</h1>
            </div>
            <Link className="ghost-link component-corner" to="/">Back to clients</Link>
        </section>
        <section className="workspace-layout single-column">
            <section className="panel-list">
                <div className="section-heading">
                    <h2>Project list</h2>
                    <span className="span-corner">{projects.length} total</span>
                </div>
                <div className="projects-list">
                    {projects.length ? projects.map((project)=><Project client_id={clientId} project={project} onDelete={deleteProject} key={project.id}></Project>) : <p className="empty-state">No projects yet. Add a project for this client.</p>}
                </div>
            </section>
        </section>
        <div className="dock-button-container">
            <button className="dock-add-button" onClick={() => setShowCreateForm(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Project
            </button>
        </div>
        {showCreateForm && (
            <div className="form-overlay" role="dialog" aria-modal="true" aria-labelledby="project-form-title">
                <form onSubmit={createProject} className="floating-form">
                    <button className="close-btn-modern" type="button" onClick={() => setShowCreateForm(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    
                    <div className="form-header">
                        <h2 id="project-form-title">Create a project</h2>
                        <p>Fill in the details to add a new project.</p>
                    </div>
                    
                    <div className="form-group">
                        <input type="text" id="title" name="title" className="modern-input" placeholder="Title" required onChange={(e)=>setTitle(e.target.value)} value={title} />
                        <label htmlFor="title" className="modern-label">Title</label>
                    </div>
                    
                    <div className="form-group">
                        <textarea id="description" name="description" className="modern-input" placeholder="Description" required value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                        <label htmlFor="description" className="modern-label">Description</label>
                    </div>
                    
                    <div className="form-group">
                        <input type="datetime-local" id="deadline" name="deadline" className="modern-input" placeholder="Deadline" required value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
                        <label htmlFor="deadline" className="modern-label">Deadline</label>
                    </div>
                    
                    <div className="select-wrapper">
                        <select id="status" className="modern-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value={1}>Planning</option>
                            <option value={2}>Active</option>
                            <option value={3}>Done</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="submit-btn-modern">Create project</button>
                </form>
            </div>
        )}
    </main>)
}
export default Projects;
