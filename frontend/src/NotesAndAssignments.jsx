import React, { useState } from 'react';
import AssignmentsPage from './AssignmentsPage';
import NotesPage from './NotesPage';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './NotesAndAssignments.css';

function NotesAndAssignments() {

  const location = useLocation();
  const username = location.state?.username

  const [page, setPage] = useState('assignments');
  const [subjectName, setSubjectName] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateSubject = async () => {
    try {
      const res = await axios.post('http://localhost:3000/subjects', {
        name: subjectName,
      });
      setMessage(`Subject created: ${res.data.name}`);
      setSubjectName('');
    } catch (err) {
      setMessage('Error creating subject',err);
    }
  };

  return (
    <div id="na-div">
      <h1>Assignments & Notes</h1>
      <div>
        <button id="assignment" onClick={() => setPage('assignments')}>Assignments</button>
        <button id="note" onClick={() => setPage('notes')}>Notes</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <button onClick={handleCreateSubject}>Add Subject</button>
        {message && <p>{message}</p>}
      </div>

      {page === 'assignments' ? (
        <AssignmentsPage username={username} />
      ) : (
        <NotesPage username={username} />
      )}

    </div>
  );
}

export default NotesAndAssignments;
