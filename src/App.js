// App.js
import React, { useState, useCallback } from 'react';
import MainPage from './components/MainPage';
import AddMeetingPage from './components/AddMeetingPage';
import AddGroupPage from './components/AddGroupPage';
import SettingsPage from './components/SettingsPage';


function App() {
    const [page, setPage] = useState('main');
    const [meetings, setMeetings] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    // useCallback으로 navigate 함수를 메모이제이션 처리
    const navigateToMain = useCallback(() => setPage('main'), []);
    const navigateToAddMeeting = useCallback(() => {
        setSelectedMeeting(null);
        setPage('addMeeting');
    }, []);
    const navigateToAddGroup = useCallback(() => setPage('addGroup'), []);

    const navigateToSettings = useCallback((meeting) => {
        setSelectedMeeting(meeting);
        setPage('settings');
    }, []);

    const addMeeting = useCallback((meeting) => {
        setMeetings((prevMeetings) => [...prevMeetings, { ...meeting, id: Date.now() }]);
        navigateToMain();
    }, [navigateToMain]);

    const addGroupFromMain = useCallback((group) => {
        setGroups((prevGroups) => [...prevGroups, { ...group, id: Date.now() }]);
        navigateToMain();  // 그룹 생성 후 MainPage로 돌아감
    }, [navigateToMain]);

    const addGroupFromSettings = useCallback((group) => {
        setGroups((prevGroups) => [...prevGroups, { ...group, id: Date.now() }]);
    }, []);

    const updateMeeting = useCallback((updatedMeeting) => {
        setMeetings((prevMeetings) =>
            prevMeetings.map((m) => (m.id === updatedMeeting.id ? updatedMeeting : m))
        );
        setSelectedMeeting(updatedMeeting);
    }, []);

    const deleteMeeting = useCallback((id) => {
        setMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting.id !== id));
    }, []);

    const addMembersToMeeting = useCallback((newMemberList) => {
        const updatedMeeting = { ...selectedMeeting, members: newMemberList };
        updateMeeting(updatedMeeting);
    }, [selectedMeeting, updateMeeting]);

    const onSavePayment = useCallback((payment) => {
        if (selectedMeeting) {
            const updatedPayments = [...(selectedMeeting.payments || []), payment];
            const updatedMeeting = { ...selectedMeeting, payments: updatedPayments };
            updateMeeting(updatedMeeting);
        }
    }, [selectedMeeting, updateMeeting]);

    const onRemovePayment = useCallback((index) => {
        if (selectedMeeting) {
            const updatedPayments = [...(selectedMeeting.payments || [])];
            updatedPayments.splice(index, 1);
            const updatedMeeting = { ...selectedMeeting, payments: updatedPayments };
            updateMeeting(updatedMeeting);
        }
    }, [selectedMeeting, updateMeeting]);

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
                    onAddGroup={addGroupFromSettings}
                    onAddMember={addMembersToMeeting}
                    onSavePayment={onSavePayment}
                    onSave={updateMeeting}
                    onRemovePayment={onRemovePayment}
                    onCancel={navigateToMain}
                />
            ) : (
                <AddGroupPage
                    onSaveGroup={addGroupFromMain}
                    onCancel={navigateToMain}
                />
            )}
        </div>
    );
}

export default App;
