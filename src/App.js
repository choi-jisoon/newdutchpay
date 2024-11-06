import React, { useState } from 'react';
import MainPage from './components/MainPage';
import AddMeetingPage from './components/AddMeetingPage';

function App() {
    const [page, setPage] = useState('main');
    const [meetings, setMeetings] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    const navigateToMain = () => setPage('main');
    const navigateToAddMeeting = () => {
        setSelectedMeeting(null);
        setPage('addMeeting');
    };

    const addMeeting = (meeting) => {
        setMeetings([...meetings, { ...meeting, id: Date.now() }]);
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
                    onEditMeeting={(meeting) => { setSelectedMeeting(meeting); setPage('addMeeting'); }}
                    onDeleteMeeting={deleteMeeting}
                />
            ) : (
                <AddMeetingPage
                    onSaveMeeting={selectedMeeting ? updateMeeting : addMeeting}
                    initialData={selectedMeeting}
                    onCancel={navigateToMain}
                />
            )}
        </div>
    );
}

export default App;
/*  */