// AddMeetingPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
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
   width: 94.5%;
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

const Select = styled.select`
   width: 100%;
   padding: 10px;
   margin: 15px 0;
   border: 1px solid #000;
   border-radius: 5px;
   font-size: 1rem;
`;

function AddMeetingPage({ onSaveMeeting, initialData = {}, onCancel, groups = [] }) {
   // initialData가 null일 경우 빈 객체로 초기화
   const safeInitialData = initialData || {};

   const [title, setTitle] = useState(safeInitialData.title || '');
   const [amount, setAmount] = useState(safeInitialData.amount || '');
   const [members, setMembers] = useState(safeInitialData.members || []);
   const [newMember, setNewMember] = useState('');
   const [selectedGroup, setSelectedGroup] = useState('');

   // 그룹 선택 시 해당 그룹의 멤버들을 participants에 추가
   useEffect(() => {
      if (selectedGroup) {
         const groupMembers = groups.find(group => group.groupName === selectedGroup)?.members || [];
         const uniqueMembers = [...new Set([...members, ...groupMembers])]; // 중복 제거
         setMembers(uniqueMembers);
      }
   }, [selectedGroup, groups]);

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
            id: safeInitialData.id || Date.now(),
            title,
            amount: parseInt(amount),
            members,
         });
      } else {
         alert("모임명, 금액, 참여자가 필요합니다.");
      }
   };

   return (
      <PageWrapper>
         <Container>
            <Title>{safeInitialData ? '새 모임 추가' : '모임 수정'}</Title>

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

            {/* 그룹 선택 드롭다운 */}
            <Select
               value={selectedGroup}
               onChange={(e) => setSelectedGroup(e.target.value)}
            >
               <option value="">그룹 선택</option>
               {groups.map(group => (
                  <option key={group.groupName} value={group.groupName}>
                     {group.groupName}
                  </option>
               ))}
            </Select>

            {/* 새로운 참여자 추가 */}
            <Input
               value={newMember}
               onChange={(e) => setNewMember(e.target.value)}
               placeholder="참여자 그룹, 혹은 새로운 그룹원"
            />
            <AddMemberButton onClick={addMember}>참여자 추가</AddMemberButton>

            {/* 참여자 목록 */}
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
      </PageWrapper>
   );
}

export default AddMeetingPage;
