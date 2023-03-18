import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './styles/TechnicianSelection.css';

function TechnicianCard({ technician, onSelect }) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    onSelect(technician.id, !checked);
  };

  return (
    <div className="ts-technician-card">
      <div className="technician-info">
        <h3>{technician.firstName} {technician.lastName}</h3>
        <p>ชื่อเล่น: {technician.nickname}</p>
        <p>เบอร์โทร: {technician.phoneNumber}</p>
        <p>ประสบการณ์: {technician.experience}</p>
        <p>อาชีพ: {technician.occupation}</p>
        <label className="ts-checkbox-label" htmlFor={`technician-${technician.id}`}>
          <input
            type="checkbox"
            id={`technician-${technician.id}`}
            checked={checked}
            onChange={handleCheck}
            className="ts-checkbox-input"
          />
          <span className="ts-checkbox-custom"></span>
          เลือกช่าง
        </label>
      </div>
      <img src={technician.imageUrl} alt={`${technician.firstName} ${technician.lastName}`} />
    </div>
  );
}

function TechnicianSelection() {
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnicians, setSelectedTechnicians] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [occupations, setOccupations] = useState([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.loggedIn) {
      alert('กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้');
      history.push('/');
    }
    fetchTechnicians();
  }, [location, history]);

  const fetchTechnicians = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/technicians');
      const data = await response.json();
      setTechnicians(data);
      const occArray = data.reduce((acc, tech) => {
        if (!acc.includes(tech.occupation)) {
          return [...acc, tech.occupation];
        }
        return acc;
      }, []);
      setOccupations(occArray);
    } catch (error) {
      console.error('Error fetching technicians:', error);
    }
  };
  

const handleTechnicianSelect = (id, isSelected) => {
if (isSelected) {
setSelectedTechnicians([...selectedTechnicians, id]);
} else {
setSelectedTechnicians(selectedTechnicians.filter((techId) => techId !== id));
}
};

const handleOccupationChange = (e) => {
setSelectedOccupation(e.target.value);
};

const handleConfirmSelection = () => {
let filteredTechnicians = technicians;
if (selectedOccupation) {
filteredTechnicians = filteredTechnicians.filter((technician) => technician.occupation === selectedOccupation);
}
filteredTechnicians = filteredTechnicians.filter((technician) => selectedTechnicians.includes(technician.id));
history.push('/selected-technicians', {
selectedTechnicians: filteredTechnicians,
});
};

return (
<div className="ts-technician-selection">
<h1>ระบบเลือกช่าง</h1>
<div className="ts-filter-container">
  <span htmlFor="occupation-select" className="ts-filter-label">กรองตามอาชีพ: </span>
  <select id="occupation-select" value={selectedOccupation} onChange={handleOccupationChange}>
    <option value="">ทั้งหมด</option>
    {occupations.map((occupation) => (
      <option key={occupation} value={occupation}>{occupation}</option>
    ))}
  </select>
</div>
<div className="ts-technician-grid">
{technicians
.filter((technician) => !selectedOccupation || technician.occupation === selectedOccupation)
.map((technician) => (
<TechnicianCard key={technician.id} technician={technician} onSelect={handleTechnicianSelect} />
))}
</div>
<button onClick={handleConfirmSelection} className="ts-confirm-button">
    ยืนยันการเลือกช่าง
  </button>
</div>
);
}

export default TechnicianSelection;
