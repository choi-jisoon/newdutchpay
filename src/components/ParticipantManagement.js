/* // ParticipantManagement.js
import React, { useState } from 'react';

function ParticipantManagement({ members, onMoveMember }) {
   const [selectedMember, setSelectedMember] = useState('');
   const [targetMeeting, setTargetMeeting] = useState('');

   const handleMove = () => {
      if (selectedMember && targetMeeting) {
         onMoveMember(selectedMember, targetMeeting);
      }
   };

   return (
      <div>
         <select onChange={(e) => setSelectedMember(e.target.value)} value={selectedMember}>
            <option value="">참여자 선택</option>
            {members.map(member => <option key={member} value={member}>{member}</option>)}
         </select>
         <input placeholder="대상 모임 ID" value={targetMeeting} onChange={(e) => setTargetMeeting(e.target.value)} />
         <button onClick={handleMove}>이동</button>
      </div>
   );
}

export default ParticipantManagement;
 */