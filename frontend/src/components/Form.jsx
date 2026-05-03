import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css"


function Form({route,method}) {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [first_name,setFirst] = useState("")
    const [last_name,setLast] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try{
            
            if(method==="login"){
                const res = await api.post(route,{username,password});
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                navigate("/")
            }
            else {
                await api.post(route,{first_name,last_name,email,username,password});
                navigate("/login")
            }
        }
        catch(error){
            alert(error)
        }
        finally{
            setLoading(false)
        }
    }


    return (
        
       <div>
        {
            (() => {
                    if(method==="login") {
                            return (
        <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>        
        <input 
            className="form-input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username"
        />
        <input 
            className="form-input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="form-button" type="submit">
            {name}
        </button>
        </form>
        )
        } else {
        return (
        <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>  
        <input 
            className="form-input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
        />
        <input 
            className="form-input"
            type="text"
            value={first_name}
            onChange={(e)=>setFirst(e.target.value)}
            placeholder="First Name"
        />
        <input 
            className="form-input"
            type="text"
            value={last_name}
            onChange={(e)=>setLast(e.target.value)}
            placeholder="Last Name"
        />
        <input 
            className="form-input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username"
        />
        <input 
            className="form-input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="form-button" type="submit">
            {name}
        </button>
        </form>)
        }
                })() 
        }
       </div>
    )
}

export default Form;