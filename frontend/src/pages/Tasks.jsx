import Task from "../components/Task";
import { useState,useEffect } from "react";
import api from "../api";
import "../styles/Task.css"
import { useParams } from "react-router-dom";

function Tasks({project}){
    const {projectId,clientId} = useParams();
    const [tasks,setTasks] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")

    const getTask = () => {
        api.get(`/api/clients/${clientId}/projects/${projectId}/tasks/`)
        .then((res) => res.data)
        .then((data)=> {setTasks(data);console.log(data);})
        .catch((err)=>alert(err))
    } 
    useEffect(()=>{
        getTask();
    },[projectId])

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
        api.post(`/api/clients/${clientId}/projects/${projectId}/tasks/`,{ title , description, deadline })
        .then((res)=>{
            if(res.status === 201){ alert("Task Created!");
                    getTask(); }
            else alert("Failed to create task")
        })
        .catch((err)=> alert(err));
           
    }

    return( <div>
        
        <h2>Create a Task</h2>
        <form onSubmit={createTask}>
            <label htmlFor="title">title:</label>
        <br />
        <input type="text" id="title" name="title" required onChange={(e)=>setTitle(e.target.value)} value={title}></input>
        <label htmlFor="content">description:</label>
        <br/>
        <input type="text" id="description" name="description" required value={description} onChange={(e)=>setDescription(e.target.value)}></input>
        <label htmlFor="content">deadline:</label>
        <br />
        <input type="date" id="due-date" name="due date" required value={deadline} onChange={(e)=>setDeadline(e.target.value)}></input>
        <br />
        <input type="submit" value="Submit"></input>
        </form>
        <div>
            <h2>Task</h2>
            {tasks.map((task)=><Task task={task} onDelete={deleteTask} key={task.id}></Task>)}

        </div>
    </div>)
}
export default Tasks;