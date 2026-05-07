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
    const [showcreateform, setShowCreateForm] = useState(false);

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
            setShowCreateForm(false)
                getClient(); 
            } else alert("Failed to create client")
        })
        .catch((err)=> alert(err));
           
    }

    return( 
    <main className="home-page app-shell">
    <div>
        <section className="page-hero">
            <div>
                <p className="eyebrow">Client Flow</p>
                <h1>Manage clients, projects, and tasks without losing the thread.</h1>
            </div>
            <a className="ghost-link" href="/logout">Logout</a>
        </section>
        <section className="wrokspace-layout single-column">
            <section className="panel-list">
                <div className="section-heading">
                    <div>
                    <p className="eyebrow">Directory</p>
                    <h2>Clients</h2>
                    <span>{clients.length} Total</span>
                    </div>
                    <div className="clients-list">
                        {clients.length ?clients.map((client)=><Client client={client} onDelete={deleteClient} key={client.id}></Client>):<p className="empty-state">No clients Yet. Create your First client to get started.</p>}
                    </div>
                </div>
            </section>
        </section>
        <button className="fab-button" type="button" onClick={() => setShowCreateForm(true)}>+</button>
        {showcreateform && (
        <div className="form-overlay" role="dialog" aria-modal="true" aria-labelledby="client-form-title">
            <form onSubmit={createClient} className="panel-from floating-form">
            <div className="form-title-row">
                <h2 id="client-form-title">Create a client</h2>
                <button className="close-button" type="button" onClick={() => setShowCreateForm(false)}>x</button>
            </div>
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
            <input type="submit" value="Create client"></input>
        </form>
        </div>)}
        
    </div>
    </main>)

}
export default Home;