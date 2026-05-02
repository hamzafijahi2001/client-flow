import { useState,useEffect } from "react";
import api from "../api";
import Client from "../components/Client";
import "../styles/Home.css"

function Home(){
    const [clients,setClients] = useState([])
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [status, setStatus] = useState(2);

    const getClient = () => {
        api.get("/api/clients/")
        .then((res) => res.data)
        .then((data)=> {setClients(data);console.log(data);})
        .catch((err)=>alert(err))
    } 
    useEffect(()=>{
        getClient();
    },[])

    const deleteClient = (id) => {
        api.delete(`/api/clients/delete/${id}/`)
        .then((res)=>{
            if(res.status===204){ alert("Client deleted!")
                getClient()
            }
            else alert("Failed to delete client")
        }).catch((err)=> alert(err))
        
    }

    const createClient = (e) =>{
        e.preventDefault()
        api.post("/api/clients/",{ name , email, phone, status })
        .then((res)=>{
            if(res.status === 201){ alert("Client Created!");
            getClient(); 
            } else alert("Failed to create client")
        })
        .catch((err)=> alert(err));
           
    }

    return( <div>
        
        <h2>Create a client</h2>
        <form onSubmit={createClient}>
            <label htmlFor="name">name:</label>
        <br />
        <input type="text" id="name" name="name" required onChange={(e)=>setName(e.target.value)} value={name}></input>
        <label htmlFor="email">email:</label>
        <br/>
        <input type="email" id="email" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <label htmlFor="phone">phone:</label>
        <br />
        <input type="text" id="phone" name="phone" required value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
        <br />
        <label htmlFor="status">status:</label>
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value={1}>Lead</option>
        <option value={2}>Active</option>
        <option value={3}>Archived</option>
        </select>
        <br />
        <input type="submit" value="Submit"></input>
        </form>
        <div>
            <h2>Clients</h2>
            {clients.map((client)=><Client client={client} onDelete={deleteClient} key={client.id}></Client>)}

        </div>
    </div>)
}
export default Home;