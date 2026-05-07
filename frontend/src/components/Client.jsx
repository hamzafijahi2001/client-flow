import React from "react";
import { useNavigate } from "react-router-dom";


function Client({client, onDelete}) {
    const statusMap = {
  1: "Lead",
  2: "Active",
  3: "Archived",
};

    const statusName = statusMap[client.status];
    const navigate = useNavigate()

    return <div className="client-container"  onClick={() => navigate(`/clients/${client.id}/projects`)}>
        <p className="client-name">{client.name}</p>
        <p className="client-email">Email : {client.email}</p>
        <p className="client-phone">Tel : {client.phone}</p>
        <p className={`client-status status-${statusName.toLowerCase()}`}>{statusName}</p>
        <button className="delete-button" onClick={(e)=> { e.stopPropagation(); onDelete(client.id);}}> delete </button>
        </div>
}

export default Client;