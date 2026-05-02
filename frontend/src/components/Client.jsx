import React from "react";
import { useNavigate } from "react-router-dom";


function Client({client, onDelete}) {

    const navigate = useNavigate()

    return <div className="client-container"  onClick={() => navigate(`/clients/${client.id}/projects`)}>
        <p className="client-name">{client.name}</p>
        <p className="client-email">{client.email}</p>
        <p className="client-phone">{client.phone}</p>
        <button className="delete-button" onClick={()=> onDelete(client.id)}> delete </button>
        </div>
}

export default Client;