import React from 'react';
import styled from 'styled-components';
import MeetingCard from './MeetingCard';

const PageContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
`;

const MainContainer = styled.div`
   min-width: 600px;
   min-height: 600px;
   padding: 20px;
   background-color: #FFF;
   position: relative;
   font-family: pretendard;
   border-radius: 3%;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

   & h1 {
      font-size: 26px;
      font-weight: 700;
      color: #000;
      text-align: center;
      margin-bottom: 70px;
   }

   & p {
      font-weight: 700;
      text-align: center;
   }
`;

const AddGroupButton = styled.button`
   position: absolute;
   top: 4.7%;
   right: 3%;
   padding: 10px 20px;
   font-size: 16px;
   cursor: pointer;
`;

const MeetingGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr); /* 2개의 열로 배치 */
   gap: 30px;
   justify-items: center;
   align-items: center;
`;

const AddMeetingCard = styled.button`
   width: 100%;   /* 부모 그리드 크기에 맞춤 */
   height: 273px; /* Card와 같은 높이로 설정 */
   border-radius: 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
   color: #000;
   text-align: center;
   padding: 15px 5px;
   font-size: 14px;
   transition: transform 0.2s ease, box-shadow 0.2s ease;

   /* hover 시 효과 */
   &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
   }
`;

function MainPage({ meetings, onAddMeetingClick, onAddGroupClick, onEditMeeting, onDeleteMeeting }) {
   return (
      <PageContainer>
         <MainContainer>
            <h1>총무의 계산기</h1>
            <AddGroupButton onClick={onAddGroupClick}>그룹 생성</AddGroupButton>
            <MeetingGrid>
               {meetings.map(meeting => (
                  <MeetingCard
                     key={meeting.id}
                     meeting={meeting}
                     onEdit={() => onEditMeeting(meeting)}
                     onDelete={() => onDeleteMeeting(meeting.id)}
                  />
               ))}
               <AddMeetingCard onClick={onAddMeetingClick}>모임 추가</AddMeetingCard>
            </MeetingGrid>
         </MainContainer>
      </PageContainer>
   );
}

export default MainPage;
