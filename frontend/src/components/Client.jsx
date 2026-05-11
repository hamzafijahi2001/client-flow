import React from "react";
import { useNavigate } from "react-router-dom";

function Client({ client, onDelete }) {
  const statusMap = {
    1: "Lead",
    2: "Active",
    3: "Archived",
  };

  const navigate = useNavigate();
  const statusName = statusMap[client.status] || "Unknown";
  
  // Movie poster style image using random Unsplash images or ui-avatars as a fallback
  const posterUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=random&color=fff&size=512&rounded=false&bold=true`;

  return (
    <div className="client-poster" onClick={() => navigate(`/clients/${client.id}/projects`)}>
      <img src={posterUrl} alt={`${client.name} cover`} className="poster-image" />
      
      <div className="poster-overlay">
        <span className={`poster-status status-${statusName.toLowerCase()}`}>{statusName}</span>
        <h3 className="poster-title">{client.name}</h3>
        
        <div className="poster-details">
          <p className="poster-contact">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            {client.email}
          </p>
          <p className="poster-contact">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            {client.phone}
          </p>
          
          <div className="poster-actions">
            <span style={{color: '#a1a1aa', fontSize: '0.8rem'}}>View Projects ➜</span>
            <button
              className="modern-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(client.id);
              }}
              title="Delete Client"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;