import React from 'react';
import styled from 'styled-components';
import MeetingCard from './MeetingCard';

const PageContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 100vh; /* 뷰포트 높이 기준 중앙 정렬 */
`;

const MainContainer = styled.div`
   min-width: 600px;
   /* min-height: 700px; */
   padding: 20px;
   background-color: #FFF;
   position: relative;
   font-family: pretendard;
   border-radius: 3%;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 입체감을 위한 그림자 */

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
   grid-template-columns: 1fr 1fr;
   gap: 30px;
   justify-items: center;
   align-items: center;
`;

function MainPage({ meetings, onAddMeetingClick, onEditMeeting, onDeleteMeeting }) {
   return (
      <PageContainer>
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
      </PageContainer>
   );
}

export default MainPage;
