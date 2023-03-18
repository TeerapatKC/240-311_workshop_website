import React from 'react';
import { useHistory } from 'react-router-dom';
import SelectedTechnicianCard from './SelectedTechnicianCard';
function SelectedTechnicians() {
  const history = useHistory();

  const selectedTechnicians = history.location.state?.selectedTechnicians || [];

  return (
    <div className="st-selected-technicians">
      <h1>ช่างที่เลือก</h1>
      <div className="st-technician-grid">
        {selectedTechnicians.map((technician) => (    
         <SelectedTechnicianCard key={technician.id} technician={technician} />
         ))}
       </div>
     </div>
);
}
export default SelectedTechnicians;     