// App.js
import React, { useState } from 'react';
import MainPage from './components/MainPage';
import AddMeetingPage from './components/AddMeetingPage';
import AddGroupPage from './components/AddGroupPage';
import SettingsPage from './components/SettingsPage';

function App() {
    const [page, setPage] = useState('main');
    const [meetings, setMeetings] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    const navigateToMain = () => setPage('main');
    const navigateToAddMeeting = () => {
        setSelectedMeeting(null);
        setPage('addMeeting');
    };
    const navigateToAddGroup = () => setPage('addGroup');

    // SettingsPage로 이동하는 함수 (meeting 정보 전달)
    const navigateToSettings = (meeting) => {
        setSelectedMeeting(meeting);
        setPage('settings');
    };

    const addMeeting = (meeting) => {
        setMeetings([...meetings, { ...meeting, id: Date.now() }]);
        navigateToMain();
    };

    const addGroup = (group) => {
        setGroups([...groups, { ...group, id: Date.now() }]);
    };

    const updateMeeting = (updatedMeeting) => {
        const updatedMeetings = meetings.map(m => m.id === updatedMeeting.id ? updatedMeeting : m);
        setMeetings(updatedMeetings);
        setSelectedMeeting(updatedMeeting);
    };

    const deleteMeeting = (id) => {
        setMeetings(meetings.filter(meeting => meeting.id !== id));
    };

    // 개별 멤버 추가 함수
    const addMembersToMeeting = (newMemberList) => {
        const updatedMeeting = { ...selectedMeeting, members: newMemberList };
        updateMeeting(updatedMeeting);
    };

    // SettingsPage에 전달할 onSavePayment 함수
    const onSavePayment = (payment) => {
        if (selectedMeeting) {
            const updatedPayments = [...(selectedMeeting.payments || []), payment];
            const updatedMeeting = { ...selectedMeeting, payments: updatedPayments };
            updateMeeting(updatedMeeting);
        }
    };

    return (
        <div className="App">
            {page === 'main' ? (
                <MainPage
                    meetings={meetings}
                    onAddMeetingClick={navigateToAddMeeting}
                    onAddGroupClick={navigateToAddGroup}
                    onSettings={navigateToSettings}
                    onDeleteMeeting={deleteMeeting}
                />
            ) : page === 'addMeeting' ? (
                <AddMeetingPage
                    onSaveMeeting={addMeeting}
                    onCancel={navigateToMain}
                    groups={groups}
                />
            ) : page === 'settings' ? (
                <SettingsPage
                    meeting={selectedMeeting}
                    groups={groups}
                    onAddGroup={addGroup}
                    onAddMember={addMembersToMeeting} // 개별 멤버 추가 함수 전달
                    onSavePayment={onSavePayment}       // 결제 내역 저장 함수 전달
                    onSave={updateMeeting}
                    onCancel={navigateToMain}
                />
            ) : (
                <AddGroupPage
                    onSaveGroup={addGroup}
                    onCancel={navigateToMain}
                />
            )}
        </div>
    );
}

export default App;
