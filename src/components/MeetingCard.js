import React from 'react';
import styled from 'styled-components';
import { Color } from './Color';

const getRandomColor = () => {
   const randomIndex = Math.floor(Math.random() * Color.length);
   return Color[randomIndex];
};

const Card = styled.div`
   background-color: ${getRandomColor};
   width: 100%;   /* 부모 그리드 크기에 맞춤 */
   height: 273px; /* AddMeetingCard와 같은 높이로 설정 */
   border-radius: 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 기본 그림자 */
   color: #000;
   text-align: center;
   font-size: 14px;
   transition: transform 0.2s ease, box-shadow 0.2s ease;

   /* hover 시 효과 */
   &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
   }
`;

const Title = styled.h3`
   font-size: 28px;
   margin: 20px 0;
   margin-top: -5px;
`;

const InfoText = styled.p`
   font-size: 16px;
   margin: 10px 0;
`;

const ButtonGroup = styled.div`
   display: flex;
   gap: 10px;
   justify-content: center;
   margin-top: 20px;
`;

const EditButton = styled.button`
   padding: 5px 10px;
   color: white;
   background-color: #4CAF50;
   border: none;
   cursor: pointer;
   border-radius: 5px;
`;

const DeleteButton = styled.button`
   padding: 5px 10px;
   color: white;
   background-color: red;
   border: none;
   cursor: pointer;
   border-radius: 5px;
`;

function MeetingCard({ meeting, onEdit, onDelete }) {
   const perPersonShare = meeting.members.length ? Math.ceil(meeting.amount / meeting.members.length) : 0;
   const firstMember = meeting.members[0];
   const remainingCount = meeting.members.length - 1;

   return (
      <Card>
         <Title>{meeting.title}</Title>
         <InfoText>총 금액: {meeting.amount}원</InfoText>
         <InfoText>
            참여자: {firstMember}
            {remainingCount > 0 && ` 외 ${remainingCount}명`}
         </InfoText>
         <InfoText>1인당 금액: {perPersonShare}원</InfoText>
         <ButtonGroup>
            <EditButton onClick={onEdit}>수정</EditButton>
            <DeleteButton onClick={onDelete}>삭제</DeleteButton>
         </ButtonGroup>
      </Card>
   );
}

export default MeetingCard;
