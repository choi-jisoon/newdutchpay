import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import AddGroupPage from './AddGroupPage';

// 스타일 정의
const PageWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
   width: 550px;
   margin: auto auto;
   flex-direction: column;
`;
const Container = styled.div`
   font-family: pretendard;
   display: flex;
   flex-direction: column;
   /* align-items: center; */
   width: 100%;
   max-width: 600px;
   padding: 20px;
   background-color: #f0f4ff;
   border-radius: 10px;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;
const Header = styled.div`
   display: flex;
   justify-content: space-between;
   width: 100%;
   max-width: 500px;
   padding: 20px;
`;

const MeetingName = styled.h2`
   font-size: 1.5rem;
   color: #333;
`;

const ButtonContainer = styled.div`
   display: flex;
   gap: 10px;
   justify-content: center;
`;

const Button = styled.button`
   font-family: pretendard;
   padding: 8px 12px;
   color: #fff;
   border: none;
   border-radius: 5px;
   font-size: 0.9rem;
   cursor: pointer;
   margin-top: 30px;
   background-color: #000;
`;

const GroupButton = styled(Button)`
   background-color: #ff6b6b;
`;

const MemberButton = styled(Button)`
   background-color: #4ac1e0;
`;

const Section = styled.div`
   width: 100%;
   max-width: 500px;
   padding: 20px;
   background-color: #fff;
   margin: 10px 0;
   border-radius: 10px;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const PaymentItem = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 10px;
   background-color: #e0e7ff;
   border-radius: 8px;
   margin-bottom: 8px;
`;

const PaymentAddButton = styled(Button)`
   width: 100%;
   background-color: #4a90e2;
   margin-top: 10px;
`;

// 추가: RemoveButton 스타일
const RemoveButton = styled.button`
   background: none;
   border: none;
   color: red;
   cursor: pointer;
   font-size: 0.8rem;
   margin-top: 3px;
   margin-left: 5px;
`;

const RemovePaymentButton = styled(RemoveButton)`
   margin-top: 0px;
   padding-left: 10px;
`;
/* const MemberSeparator = styled.span`
   margin: 5px 8px;
`; */

function SettingsPage({ meeting = {}, groups, onAddGroup, onAddMember, onSavePayment, onCancel, onRemovePayment }) {
   const [isAddingGroup, setIsAddingGroup] = useState(false);
   const [isAddingMember, setIsAddingMember] = useState(false);
   const [newMember, setNewMember] = useState('');
   const [selectedGroup, setSelectedGroup] = useState('');
   const [isAddingPayment, setIsAddingPayment] = useState(false);
   const [paymentName, setPaymentName] = useState('');
   const [paymentAmount, setPaymentAmount] = useState('');
   const [selectedMembers, setSelectedMembers] = useState([]);
   const [members, setMembers] = useState(Array.isArray(meeting.members) ? meeting.members : []);
   const payments = meeting.payments || [];

   useEffect(() => {
      if (Array.isArray(meeting.members)) {
         setMembers(meeting.members);
      }
   }, [meeting.members]);

   const addMemberOrGroup = () => {
      if (newMember && !members.includes(newMember)) {
         const updatedMembers = [...members, newMember];
         setMembers(updatedMembers);
         onAddMember(updatedMembers);
         setNewMember('');
      } else if (selectedGroup) {
         const groupMembers = groups.find(group => group.groupName === selectedGroup)?.members || [];
         const uniqueMembers = [...new Set([...members, ...groupMembers])];
         setMembers(uniqueMembers);
         onAddMember(uniqueMembers);
         setSelectedGroup('');
      }
      setIsAddingMember(false);
   };

   const removeMember = (member) => {
      const updatedMembers = members.filter((m) => m !== member);
      setMembers(updatedMembers);
      onAddMember(updatedMembers);
   };

   const handleSavePayment = () => {
      if (selectedMembers.length > 0) {
         const perPersonShare = Math.ceil(paymentAmount / selectedMembers.length);
         onSavePayment({
            name: paymentName,
            amount: paymentAmount,
            members: selectedMembers,
            perPersonShare,
         });
         setIsAddingPayment(false);
         setPaymentName('');
         setPaymentAmount(0);
         setSelectedMembers([]);
      }
   };

   return (
      <PageWrapper>
         <Container>
         <Header>
            <MeetingName>{meeting.title}</MeetingName>
            <ButtonContainer>
               <GroupButton onClick={() => setIsAddingGroup(!isAddingGroup)}>그룹 추가</GroupButton>
               <MemberButton onClick={() => setIsAddingMember(!isAddingMember)}>멤버 추가</MemberButton>
            </ButtonContainer>
         </Header>

         <Section>
            <h3>{meeting.title} 모임 멤버</h3>
            <div>
               {members.map((member, index) => (
                  <span className='setting_span' key={index} style={{ display: 'inline-flex', alignItems: 'center' }}>
                     {member}
                     <RemoveButton onClick={() => removeMember(member)}><FontAwesomeIcon icon={faXmark} size='xl'/></RemoveButton>
                  </span>
               ))}
            </div>
         </Section>

         {isAddingMember && (
            <Section>
               <input
                  type="text"
                  placeholder=" 새 멤버 이름"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
               />
               <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                  <option value="">그룹 선택</option>
                  {groups.map(group => (
                     <option key={group.groupName} value={group.groupName}>
                        {group.groupName}
                     </option>
                  ))}
               </select>
               <button className='member_group_add' onClick={addMemberOrGroup}>추가</button>
            </Section>
         )}

         {isAddingGroup && (
            <Section>
               <AddGroupPage
                  onSaveGroup={(group) => {
                     onAddGroup(group);   // 그룹 추가
                     setIsAddingGroup(false); // 모달 닫기
                  }}
                  onCancel={() => setIsAddingGroup(false)}
               />
            </Section>
         )}

         <Section>
            <h3>결제 내역</h3>
            {payments.map((payment, index) => (
               <PaymentItem key={index}>
                  <span>{payment.name} ({payment.members.length}명)</span>
                  <span>{payment.amount}원 / 1인당 {payment.perPersonShare}원</span>
                  <RemovePaymentButton onClick={() => onRemovePayment(index)}><FontAwesomeIcon icon={faXmark} size='xl'/></RemovePaymentButton>
               </PaymentItem>
            ))}
            <PaymentAddButton onClick={() => setIsAddingPayment(true)}>+ 결제내역 추가</PaymentAddButton>
         </Section>

         {isAddingPayment && (
            <Section>
               <h3>새로운 결제 내역</h3>
               <input
                  type="text"
                  placeholder=" 결제명"
                  value={paymentName}
                  onChange={(e) => setPaymentName(e.target.value)}
               />
               <input
                  type="number"
                  placeholder=" 총 결제 금액"
                  value={paymentAmount || ""}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
               />
               <div>
                  <h4>멤버 선택</h4>
                  {members.map((member, index) => (
                     <label key={index}>
                        <input className='check'
                           type="checkbox"
                           value={member}
                           onChange={(e) => {
                              if (e.target.checked) {
                                 setSelectedMembers([...selectedMembers, member]);
                              } else {
                                 setSelectedMembers(selectedMembers.filter(m => m !== member));
                              }
                           }}
                        />
                        {member}
                     </label>
                  ))}
               </div>
               <ButtonContainer>
                  <Button onClick={handleSavePayment}>저장</Button>
                  <Button onClick={() => setIsAddingPayment(false)}>취소</Button>
               </ButtonContainer>
            </Section>
         )}

         <ButtonContainer>
            <Button onClick={onCancel} style={{ backgroundColor: '#e55555', marginTop: '20px', marginBottom: '30px' }}>
               닫기
            </Button>
         </ButtonContainer>
         </Container>
      </PageWrapper>
   );
}

export default SettingsPage;