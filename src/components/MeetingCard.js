import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from './Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faFlag } from '@fortawesome/free-solid-svg-icons';

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
   position: relative;
   transition: transform 0.2s ease, box-shadow 0.2s ease;

   &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
   }
`;

const SettingsButton = styled.button`
   position: absolute;
   top: 10px;
   right: 10px;
   padding: 5px 10px;
   color: white;
   background: none;
   border: none;
   cursor: pointer;
   border-radius: 5px;
   font-size: 20px;
`;

const Title = styled.h3`
   font-size: 26px;
   margin: 10px 0;
   font-weight: 700;
`;

const DateText = styled.p`
   font-size: 16px;
   color: #000;
   margin: 15px 0;
`;

const InfoText = styled.p`
   font-size: 16px;
   margin: 10px 0;
`;

const RepresentativeText = styled.p`
   display: flex;
   justify-content: center; align-items: center;
   gap: 5px;
   font-size: 14px;
   background-color: #ffffff;
   color: #000;
   padding: 5px 10px;
   border-radius: 5px;
   margin-top: 20px;
`;

const DeleteButton = styled.button`
   font-family: pretendard;
   padding: 5px 10px;
   color: white;
   background-color: red;
   border: none;
   cursor: pointer;
   border-radius: 5px;
   margin-top: 10px;
   /* margin-left: 1px; */
`;

function MeetingCard({ meeting, onSettings, onDelete }) {
   const [currentDate, setCurrentDate] = useState("");

   // 날짜 포맷팅 함수
   const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
   };

   // 컴포넌트가 마운트될 때 현재 날짜를 설정
   useEffect(() => {
      const today = new Date();
      setCurrentDate(formatDate(today));
   }, []);

   const firstMember = meeting.members[0];
   const remainingCount = meeting.members.length;

   return (
      <Card>
         <SettingsButton onClick={() => onSettings(meeting)}>
            <FontAwesomeIcon icon={faGear} />
         </SettingsButton>
         <DateText>{currentDate}</DateText> {/* 생성 날짜를 표시 */}
         <Title>{meeting.title}</Title>
         <InfoText>총 {remainingCount}명</InfoText>
         <RepresentativeText><FontAwesomeIcon icon={faFlag}/>{firstMember}</RepresentativeText>
         <DeleteButton onClick={() => onDelete(meeting.id)}><span className='meeting_delete'>삭제</span></DeleteButton>
      </Card>
   );
}

export default MeetingCard;
