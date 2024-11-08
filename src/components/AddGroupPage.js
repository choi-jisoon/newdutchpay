import React, { useState } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
/* min-height: 100vh; */
`;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
max-width: 400px;
padding: 20px;
background-color: #FFF;
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
`;

const Title = styled.h2`
font-size: 1.5rem;
color: #333;
margin-bottom: 20px;
`;

const Input = styled.input`
width: 100%;
padding: 10px;
margin: 15px 0;
border: 1px solid #000;
border-radius: 5px;
font-size: 1rem;
`;

const AddMemberButton = styled.button`
background-color: #4CAF50;
color: white;
padding: 10px;
border: none;
border-radius: 5px;
cursor: pointer;
margin-top: 10px;
font-size: 1rem;
`;

const MemberList = styled.ul`
list-style: none;
padding: 0;
margin: 20px 0;
display: flex;
flex-wrap: wrap;
gap: 10px;
justify-content: center;
`;

const MemberItem = styled.li`
font-weight: 700;
background-color: #333;
padding: 6px 10px;
border-radius: 20px;
font-size: 1rem;
color: #fff;
display: flex;
align-items: center;
gap: 5px;
`;

const RemoveButton = styled.button`
background: none;
border: none;
color: red;
cursor: pointer;
font-size: 12px;
`;

const ButtonG = styled.div`
display: flex;
gap: 20px;
`;

const SaveButton = styled.button`
background-color: #6200ea;
color: white;
padding: 12px 20px;
border: none;
border-radius: 8px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
`;

const CancelButton = styled.button`
background-color: #e55555;
color: white;
padding: 12px 20px;
border: none;
border-radius: 8px;
font-size: 1rem;
cursor: pointer;
margin-top: 20px;
`;

function AddGroupPage({ onSaveGroup, onCancel }) {
   const [groupName, setGroupName] = useState('');
   const [members, setMembers] = useState([]);
   const [newMember, setNewMember] = useState('');

   const handleAddMember = () => {
      if (newMember && !members.includes(newMember)) {
         setMembers([...members, newMember]);
         setNewMember('');
      }
   };

   const handleRemoveMember = (member) => {
      setMembers(members.filter(m => m !== member));
   };

   const handleSaveGroup = () => {
      if (groupName && members.length > 0) {
         onSaveGroup({ groupName, members });
      }
   };

   return (
      <PageWrapper>
         <Container>
               <Title>그룹 생성</Title>
               <Input
                  type="text"
                  placeholder="그룹명"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
               />
               <Input
                  type="text"
                  placeholder="그룹원 이름"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
               />
               <AddMemberButton onClick={handleAddMember}>그룹원 추가</AddMemberButton>

               <MemberList>
                  {members.map(member => (
                     <MemberItem key={member}>
                           {member}
                           <RemoveButton onClick={() => handleRemoveMember(member)}>✕</RemoveButton>
                     </MemberItem>
                  ))}
               </MemberList>

               <ButtonG>
                  <SaveButton onClick={handleSaveGroup}>저장</SaveButton>
                  <CancelButton onClick={onCancel}>취소</CancelButton>
               </ButtonG>
         </Container>
      </PageWrapper>
   );
}

export default AddGroupPage;
