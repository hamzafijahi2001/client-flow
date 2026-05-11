import { useState, useEffect } from "react";
import api from "../api";
import Client from "../components/Client";
import "../styles/Home.css";

function Home() {
    const [clients, setClients] = useState([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState(2);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const getClient = () => {
        api.get("/api/clients/")
            .then((res) => res.data)
            .then((data) => { setClients(data); console.log(data); })
            .catch((err) => alert(err));
    };
    
    useEffect(() => {
        getClient();
    }, []);

    const deleteClient = (id) => {
        api.delete(`/api/clients/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    getClient();
                }
                else alert("Failed to delete client");
            }).catch((err) => alert(err));
    };

    const createClient = (e) => {
        e.preventDefault();
        api.post("/api/clients/", { name, email, phone, status })
            .then((res) => {
                if (res.status === 201) {
                    setName("");
                    setEmail("");
                    setPhone("");
                    setStatus(2);
                    setShowCreateForm(false);
                    getClient();
                } else alert("Failed to create client");
            })
            .catch((err) => alert(err));
    };

    return (
        <main className="home-page app-shell">
            <section className="page-hero">
                <div className="hero-glow"></div>
                <h1>Client Flow</h1>
                <p className="subtitle">Manage all your clients, projects, and active tasks effortlessly in a beautiful, modern workspace.</p>
                <a className="ghost-link component-corner" href="/logout">Logout</a>
            </section>
            
            <div className="clients-grid">
                {clients.length > 0 ? (
                    clients.map((client) => <Client client={client} onDelete={deleteClient} key={client.id}></Client>)
                ) : (
                    <div style={{gridColumn: "1 / -1"}}>
                        <p className="empty-state">No clients yet. Add a client to get started.</p>
                    </div>
                )}
            </div>

            <div className="dock-button-container">
                <button className="dock-add-button" onClick={() => setShowCreateForm(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New Client
                </button>
            </div>
            
            {showCreateForm && (
                <div className="form-overlay" role="dialog" aria-modal="true" aria-labelledby="client-form-title">
                    <form onSubmit={createClient} className="floating-form">
                        <button className="close-btn-modern" type="button" onClick={() => setShowCreateForm(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        
                        <div className="form-header">
                            <h2>Add New Client</h2>
                            <p>Fill in the details to add them to your studio.</p>
                        </div>
                        
                        <div className="form-group">
                            <input type="text" id="name" name="name" className="modern-input" placeholder="Name" required onChange={(e) => setName(e.target.value)} value={name} />
                            <label htmlFor="name" className="modern-label">Full Name</label>
                        </div>
                        
                        <div className="form-group">
                            <input type="email" id="email" name="email" className="modern-input" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email" className="modern-label">Email Address</label>
                        </div>
                        
                        <div className="form-group">
                            <input type="text" id="phone" name="phone" className="modern-input" placeholder="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <label htmlFor="phone" className="modern-label">Phone Number</label>
                        </div>
                        
                        <div className="select-wrapper">
                            <select id="status" className="modern-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value={1}>Lead</option>
                                <option value={2}>Active</option>
                                <option value={3}>Archived</option>
                            </select>
                        </div>
                        
                        <button type="submit" className="submit-btn-modern">Create Client</button>
                    </form>
                </div>
            )}
        </main>
    );
}

export default Home;