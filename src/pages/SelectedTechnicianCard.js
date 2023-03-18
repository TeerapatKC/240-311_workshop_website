import React from 'react';
import './styles/SelectedTechnicianCard.css';

function SelectedTechnicianCard({ technician }) {
  return (
    <div className="stc-selected-technician-card">
      <div className="technician-info">
        <h3>{technician.firstName} {technician.lastName}</h3>
        <p>ชื่อเล่น: {technician.nickname}</p>
        <p>เบอร์โทร: {technician.phoneNumber}</p>
        <p>ประสบการณ์: {technician.experience}</p>
        <p>อาชีพ: {technician.occupation}</p>
      </div>
      <img src={technician.imageUrl} alt={`${technician.firstName} ${technician.lastName}`} />
    </div>
  );
}

export default SelectedTechnicianCard;
