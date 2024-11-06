import React, { useState } from 'react';
import MainPage from './components/MainPage';
import AddMeetingPage from './components/AddMeetingPage';
import AddGroupPage from './components/AddGroupPage';

function App() {
const [page, setPage] = useState('main');
const [meetings, setMeetings] = useState([]);
const [groups, setGroups] = useState([]); // 그룹 데이터를 따로 관리
const [selectedMeeting, setSelectedMeeting] = useState(null);

const navigateToMain = () => setPage('main');
const navigateToAddMeeting = () => {
    setSelectedMeeting(null);
    setPage('addMeeting');
};
const navigateToAddGroup = () => setPage('addGroup');

const addMeeting = (meeting) => {
    setMeetings([...meetings, { ...meeting, id: Date.now() }]);
    navigateToMain();
};

const addGroup = (group) => {
    setGroups([...groups, { ...group, id: Date.now() }]);
    navigateToMain();
};

const updateMeeting = (updatedMeeting) => {
    setMeetings(meetings.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
    navigateToMain();
};

const deleteMeeting = (id) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
};

return (
    <div className="App">
        {page === 'main' ? (
        <MainPage
            meetings={meetings}
            onAddMeetingClick={navigateToAddMeeting}
            onAddGroupClick={navigateToAddGroup}
            onEditMeeting={(meeting) => { setSelectedMeeting(meeting); setPage('addMeeting'); }}
            onDeleteMeeting={deleteMeeting}
        />
        ) : page === 'addMeeting' ? (
        <AddMeetingPage
            onSaveMeeting={selectedMeeting ? updateMeeting : addMeeting}
            initialData={selectedMeeting}
            onCancel={navigateToMain}
            groups={groups} // 그룹 데이터를 AddMeetingPage에 전달
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
