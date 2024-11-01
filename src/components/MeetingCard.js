import React from 'react';
import styled from 'styled-components';
import { Color } from './Color';

const getRandomColor = () => {
   const randomIndex = Math.floor(Math.random() * Color.length);
   return Color[randomIndex];
};

const Card = styled.div`
   background-color: ${getRandomColor};
   width: 100%;
   height: 250px; /* 카드의 높이를 조정 */
   border-radius: 10px;
  /*  padding: 15px; */
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
   color: #000;
   text-align: center;
   font-size: 14px;
`

const Title = styled.h3`
   font-size: 28px;
   margin: 20px 0;
   margin-top: -5px;
`

const InfoText = styled.p`
   font-size: 16px;
   margin: 10px 0;
`

const ButtonGroup = styled.div`
   display: flex;
   gap: 10px;
   justify-content: center;
   margin-top: 20px;
`

const EditButton = styled.button`
   padding: 5px 10px;
   color: white;
   background-color: #4CAF50;
   border: none;
   cursor: pointer;
   border-radius: 5px;
`

const DeleteButton = styled.button`
   padding: 5px 10px;
   color: white;
   background-color: red;
   border: none;
   cursor: pointer;
   border-radius: 5px;
`

function MeetingCard({ meeting, onEdit, onDelete }) {
   const perPersonShare = meeting.members.length ? Math.ceil(meeting.amount / meeting.members.length) : 0;

   // 첫 번째 참여자 이름과 나머지 인원 수 계산
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
