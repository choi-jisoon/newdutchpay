import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   margin: auto;
   align-items: center;
   width: 100%;
   max-width: 400px;
   padding: 20px;
   background-color: #999;
   border-radius: 10px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
   border: 1px solid #ddd;
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
   margin: 50px 0;
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
   display: flex; gap: 20px;
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

function AddMeetingPage({ onSaveMeeting, initialData, onCancel }) {
   const [title, setTitle] = useState(initialData ? initialData.title : '');
   const [amount, setAmount] = useState(initialData ? initialData.amount : '');
   const [members, setMembers] = useState(initialData ? initialData.members : []);
   const [newMember, setNewMember] = useState('');

   const addMember = () => {
      if (newMember.trim() && !members.includes(newMember)) {
         setMembers([...members, newMember]);
         setNewMember('');
      }
   };

   const removeMember = (member) => {
      setMembers(members.filter((m) => m !== member));
   };

   const saveMeeting = () => {
      if (title && amount && members.length > 0) {
         onSaveMeeting({
            id: initialData ? initialData.id : Date.now(),
            title,
            amount: parseInt(amount),
            members,
         });
      } else {
         alert("모임명, 금액, 참여자가 필요합니다.");
      }
   };
/*  */
   return (
      <Container>
         <Title>{initialData ? '모임 수정' : '새 모임 추가'}</Title>
         <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="모임명"
         />
         <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="총 금액"
            type="number"
         />
         <Input
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="참여자 이름"
         />
         <AddMemberButton onClick={addMember}>참여자 추가</AddMemberButton>
         <MemberList>
            {members.map((member, index) => (
               <MemberItem key={index}>
                  {member}
                  <RemoveButton onClick={() => removeMember(member)}>x</RemoveButton>
               </MemberItem>
            ))}
         </MemberList>
         <ButtonG>
            <SaveButton onClick={saveMeeting}>저장</SaveButton>
            <CancelButton onClick={onCancel}>취소</CancelButton>
         </ButtonG>
      </Container>
   );
}

export default AddMeetingPage;
