import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubjectSelector from './SubjectSelector';
import './NotesPage.css';

const NotesPage = ({ username }) => {
  const [subjectId, setSubjectId] = useState('');
  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState(null);
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  const fetchNotes = () => {
    if (!subjectId) return;
    axios.get(`http://localhost:3000/notes/${subjectId}`)
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchNotes();
  }, [subjectId]);

  const uploadNote = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', username);
    formData.append('subject', subjectId);

    axios.post('http://localhost:3000/notes/upload', formData)
      .then(() => {
        alert('Note uploaded');
        setFile(null);
        fetchNotes();
      });
  };

  const toggleExpand = (id) => {
    setExpandedNoteId(prev => (prev === id ? null : id));
  };

  return (
    <div id="notes-div">
      <h2>Notes</h2><br />
      <SubjectSelector onSelect={setSubjectId} /><br />
      <input id='fileinput' type="file" onChange={e => setFile(e.target.files[0])} /><br />
      <button id="upload-button" onClick={uploadNote} disabled={!file || !subjectId}>Upload</button>

      <div style={{ marginTop: '20px' }}>
        {notes.map(note => (
          <div
            key={note._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '35px',
              backgroundColor: 'white',
              width:'55vw'
            }}
          >
            <h3>{note.filename || "Untitled Document"}</h3><br />
            <p style={{color:'gray', marginBottom:'10px'}}>Uploaded by: <strong>{note.user}</strong></p>
            <p style={{color:'gray'}}>Date: {new Date(note.uploadedAt).toLocaleString()}</p><br />
            <div style={{ marginTop: '8px' }}>
              <a id="download" href={note.fileUrl} target="_blank" rel="noopener noreferrer" style={{ marginRight: '12px' }}>
                Download
              </a>
              {note.fileUrl.endsWith('.pdf') && (
                <button id="expand" onClick={() => toggleExpand(note._id)}>
                  {expandedNoteId === note._id ? 'Collapse' : 'Expand'}
                </button>
              )}
            </div>
            {expandedNoteId === note._id && note.fileUrl.endsWith('.pdf') && (
              <iframe
                src={note.fileUrl}
                width="100%"
                height="400px"
                title={note.filename}
                style={{ border: '1px solid #999', marginTop: '12px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
