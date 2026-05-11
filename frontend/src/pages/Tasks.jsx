import Task from "../components/Task";
import { useState,useEffect,useCallback } from "react";
import api from "../api";
import "../styles/Task.css"
import { Link, useParams } from "react-router-dom";

function Tasks(){
    const {projectId,clientId} = useParams();
    const [tasks,setTasks] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")
    const [priority, setPriority] = useState(1)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const priorityColumns = [
        { id: 1, label: "Must Have" },
        { id: 2, label: "Should Have" },
        { id: 3, label: "Could Have" },
        { id: 4, label: "Won't Have" },
    ]

    const getTask = useCallback(() => {
        api.get(`/api/clients/${clientId}/projects/${projectId}/tasks/`)
        .then((res) => res.data)
        .then((data)=> {setTasks(data);console.log(data);})
        .catch((err)=>alert(err))
    }, [clientId, projectId])
    useEffect(()=>{
        getTask();
    },[getTask])

    const deleteTask = (id) => {
        api.delete(`/api/clients/${clientId}/project/${projectId}/task/delete/${id}/`)
        .then((res)=>{
            if(res.status===204){ alert("Task deleted!")
            getTask();}
            else alert("Failed to delete task")
        }).catch((err)=> alert(err))
        
    }

    const createTask = (e) =>{
        e.preventDefault()
        api.post(`/api/clients/${clientId}/projects/${projectId}/tasks/`,{ title , description, deadline, priority })
        .then((res)=>{
            if(res.status === 201){ alert("Task Created!");
                    setTitle("");
                    setDescription("");
                    setDeadline("");
                    setPriority(1);
                    setShowCreateForm(false);
                    getTask(); }
            else alert("Failed to create task")
        })
        .catch((err)=> alert(err));
           
    }

    return( <main className="tasks-page app-shell">
        <section className="page-hero">
            <div>
                <h1>Tasks</h1>
            </div>
            <Link className="ghost-link component-corner" to={`/clients/${clientId}/projects`}>Back to projects</Link>
        </section>
        <section className="workspace-layout single-column">
            <section className="panel-list">
                <div className="section-heading">
                    <h2>Task list</h2>
                    <span className="span-corner">{tasks.length} total</span>
                </div>
                <div className="task-tables">
                    {priorityColumns.map((column) => {
                        const columnTasks = tasks.filter((task) => Number(task.priority) === column.id);
                        return (
                            <section className="task-table-card" key={column.id}>
                                <div className="task-table-heading">
                                    <h3>{column.label}</h3>
                                    <span>{columnTasks.length}</span>
                                </div>
                                {columnTasks.length ? (
                                    <table className="task-table">
                                        <thead>
                                            <tr>
                                                <th>Task</th>
                                                <th>Deadline</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {columnTasks.map((task)=><Task task={task} onDelete={deleteTask} key={task.id}></Task>)}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="empty-state compact">No tasks here.</p>
                                )}
                            </section>
                        )
                    })}
                </div>
            </section>
        </section>
        <div className="dock-button-container">
            <button className="dock-add-button" onClick={() => setShowCreateForm(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Task
            </button>
        </div>
        {showCreateForm && (
            <div className="form-overlay" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
                <form onSubmit={createTask} className="floating-form">
                    <button className="close-btn-modern" type="button" onClick={() => setShowCreateForm(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    
                    <div className="form-header">
                        <h2 id="task-form-title">Create a task</h2>
                        <p>Fill in the details to add a new task.</p>
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
                        <input type="date" id="due-date" name="due date" className="modern-input" placeholder="Deadline" required value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
                        <label htmlFor="due-date" className="modern-label">Deadline</label>
                    </div>
                    
                    <div className="select-wrapper">
                        <select id="priority" className="modern-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value={1}>Must Have</option>
                            <option value={2}>Should Have</option>
                            <option value={3}>Could Have</option>
                            <option value={4}>Won't Have</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="submit-btn-modern">Create task</button>
                </form>
            </div>
        )}
    </main>)
}
export default Tasks;
