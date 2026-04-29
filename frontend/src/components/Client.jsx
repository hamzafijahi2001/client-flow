import React from "react";


function Client({client, onDelete}) {


    return <div className="client-container">
        <p className="client-name">{client.name}</p>
        <p className="client-email">{client.email}</p>
        <p className="client-phone">{client.phone}</p>
        <button className="delete-button" onClick={()=> onDelete(client.id)}> delete </button>
        </div>
}

export default Client;