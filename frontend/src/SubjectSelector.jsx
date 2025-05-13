import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubjectSelector = ({ onSelect }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/subjects')
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      style={{
        padding: '10px 14px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        width: '100%'
      }}
    >
      <option value="">Select Subject</option>
      {subjects.map(sub => (
        <option key={sub._id} value={sub._id}>{sub.name}</option>
      ))}
    </select>
  );
};

export default SubjectSelector;
