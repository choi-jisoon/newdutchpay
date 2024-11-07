import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddGroupPage from './AddGroupPage';

// 스타일 정의
const PageWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: auto;
   width: 600px;
   margin: auto auto;
   flex-direction: column;
   background-color: #f0f4ff;
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
`;

const Button = styled.button`
   padding: 8px 12px;
   color: #fff;
   border: none;
   border-radius: 5px;
   font-size: 0.9rem;
   cursor: pointer;
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

function SettingsPage({ meeting = {}, groups, onAddGroup, onAddMember, onSavePayment, onCancel }) {
   const [isAddingGroup, setIsAddingGroup] = useState(false);
   const [isAddingMember, setIsAddingMember] = useState(false);
   const [newMember, setNewMember] = useState('');
   const [selectedGroup, setSelectedGroup] = useState('');
   const [isAddingPayment, setIsAddingPayment] = useState(false);
   const [paymentName, setPaymentName] = useState('');
   const [paymentAmount, setPaymentAmount] = useState(0);
   const [selectedMembers, setSelectedMembers] = useState([]);
   const [members, setMembers] = useState(meeting.members || []);
   const payments = meeting.payments || [];

   useEffect(() => {
      setMembers(meeting.members || []);
   }, [meeting]);

   // 개별 멤버 추가 및 그룹 선택 핸들러
   const addMemberOrGroup = () => {
      if (newMember && !members.includes(newMember)) {
         // 개별 멤버 추가
         onAddMember(newMember);
         setMembers([...members, newMember]);
         setNewMember('');
      } else if (selectedGroup) {
         // 그룹 멤버 추가
         const groupMembers = groups.find(group => group.groupName === selectedGroup)?.members || [];
         const uniqueMembers = [...new Set([...members, ...groupMembers])]; // 중복 제거
         setMembers(uniqueMembers);
         onAddMember(uniqueMembers);
         setSelectedGroup('');
      }
      setIsAddingMember(false);
   };

   // 결제 내역 저장 핸들러
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
         {/* Header */}
         <Header>
            <MeetingName>{meeting.title}</MeetingName>
            <ButtonContainer>
               <GroupButton onClick={() => setIsAddingGroup(!isAddingGroup)}>그룹 추가</GroupButton>
               <MemberButton onClick={() => setIsAddingMember(!isAddingMember)}>멤버 추가</MemberButton>
            </ButtonContainer>
         </Header>

         {/* 모임 멤버 목록 */}
         <Section>
            <h3>{meeting.title}모임 멤버</h3>
            <div>
               {members.map((member, index) => (
                  <span key={index}>
                     {member}
                     {index < members.length - 1 && ', '}
                  </span>
               ))}
            </div>
         </Section>

         {/* 개별 멤버 및 그룹 선택 섹션 */}
         {isAddingMember && (
            <Section>
               <input
                  type="text"
                  placeholder="새 멤버 이름"
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
               <button onClick={addMemberOrGroup}>추가</button>
            </Section>
         )}

         {/* 그룹 추가 페이지 */}
         {isAddingGroup && (
            <Section>
               <AddGroupPage
                  onSaveGroup={(group) => {
                     onAddGroup(group);
                     setIsAddingGroup(false);
                  }}
                  onCancel={() => setIsAddingGroup(false)}
               />
            </Section>
         )}

         {/* 결제 내역 표시 */}
         <Section>
            <h3>결제 내역</h3>
            {payments.map((payment, index) => (
               <PaymentItem key={index}>
                  <span>{payment.name} ({payment.members.length}명)</span>
                  <span>{payment.amount}원 / 1인당 {payment.perPersonShare}원</span>
               </PaymentItem>
            ))}
            <PaymentAddButton onClick={() => setIsAddingPayment(true)}>+ 결제내역 추가</PaymentAddButton>
         </Section>

         {/* 결제 내역 추가 섹션 */}
         {isAddingPayment && (
            <Section>
               <h3>새로운 결제 내역</h3>
               <input
                  type="text"
                  placeholder="결제명"
                  value={paymentName}
                  onChange={(e) => setPaymentName(e.target.value)}
               />
               <input
                  type="number"
                  placeholder="결제 금액"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
               />
               <div>
                  <h4>멤버 선택</h4>
                  {members.map((member, index) => (
                     <label key={index}>
                        <input
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

         {/* 닫기 버튼 */}
         <ButtonContainer>
            <Button onClick={onCancel} style={{ backgroundColor: '#ccc', marginTop: '20px' }}>
               닫기
            </Button>
         </ButtonContainer>
      </PageWrapper>
   );
}

export default SettingsPage;
