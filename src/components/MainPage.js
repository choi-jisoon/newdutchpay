import React from 'react';
import styled from 'styled-components';
import MeetingCard from './MeetingCard';

const MainContainer = styled.div`
   max-width: 800px;
   min-height: 800px;
   margin: 0 auto;
   padding: 20px;
   background-color: #999;
   position: relative;
   font-family: pretendard;
   border-radius: 3%;

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

const AddButton = styled.button`
   position: absolute;
   top: 3.5%;
   right: 3%;
   padding: 10px 20px;
   font-size: 16px;
   cursor: pointer;
`;

const MeetingGrid = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr; /* 한 줄에 두 개의 카드 */
   gap: 20px;
`;

function MainPage({ meetings, onAddMeetingClick, onEditMeeting, onDeleteMeeting }) {
   return (
      <MainContainer>
         <h1>더치페이 모임 목록</h1>
         <AddButton onClick={onAddMeetingClick}>+ 모임 추가</AddButton>
         {meetings.length > 0 ? (
            <MeetingGrid>
               {meetings.map(meeting => (
                  <MeetingCard
                     key={meeting.id}
                     meeting={meeting}
                     onEdit={() => onEditMeeting(meeting)}
                     onDelete={() => onDeleteMeeting(meeting.id)}
                  />
               ))}
            </MeetingGrid>
         ) : (
            <p>모임이 없습니다. 새 모임을 추가해 주세요.</p>
         )}
      </MainContainer>
   );
}

export default MainPage;
