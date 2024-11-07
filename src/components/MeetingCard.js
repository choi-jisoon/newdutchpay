import React from 'react';
import styled from 'styled-components';
import { Color } from './Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
const getRandomColor = () => {
   const randomIndex = Math.floor(Math.random() * Color.length);
   return Color[randomIndex];
};

const Card = styled.div`
   background-color: ${getRandomColor};
   width: 100%;
   height: 273px;
   border-radius: 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
   color: #000;
   text-align: center;
   font-size: 14px;
   position: relative; /* 설정 버튼 위치를 위해 */
   transition: transform 0.2s ease, box-shadow 0.2s ease;

   &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
   }
`;

const SettingsButton = styled.button`
   position: absolute;
   top: 35px;
   right: 10px;
   padding: 5px 10px;
   color: white;
   background: none;
   border: none;
   cursor: pointer;
   border-radius: 5px;
   font-size: 28px;
`;

const Title = styled.h3`
   font-size: 28px;
   margin: 20px 0;
   margin-top: 20px;
`;

const InfoText = styled.p`
   font-size: 16px;
   margin: 10px 0;
`;

const DeleteButton = styled.button`
   padding: 5px 10px;
   color: white;
   background-color: red;
   border: none;
   cursor: pointer;
   border-radius: 5px;
   margin-top: 15px;
`;

function MeetingCard({ meeting, onSettings, onDelete }) {
   const perPersonShare = meeting.members.length ? Math.ceil(meeting.amount / meeting.members.length) : 0;
   const firstMember = meeting.members[0];
   const remainingCount = meeting.members.length - 1;

   return (
      <Card>
         <SettingsButton onClick={() => onSettings(meeting)}><FontAwesomeIcon icon={faGear}></FontAwesomeIcon></SettingsButton>
         <Title>{meeting.title}</Title>
         <InfoText>총 금액: {meeting.amount}원</InfoText>
         <InfoText>
            참여자: {firstMember}
            {remainingCount > 0 && ` 외 ${remainingCount}명`}
         </InfoText>
         <InfoText>1인당 금액: {perPersonShare}원</InfoText>
         <DeleteButton onClick={() => onDelete(meeting.id)}>삭제</DeleteButton>
      </Card>
   );
}

export default MeetingCard;
