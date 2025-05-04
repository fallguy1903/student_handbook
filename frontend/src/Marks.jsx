import { useState, useEffect } from 'react';
import Gpa_Calculator from './GPA_Calulator';
import './GPA_Calculator.css';

export default function Marks() {
  // Get user from localStorage (persisted after login)
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [subjects, setSubjects] = useState([]);
  const [showCalculator, setShowCalculator] = useState(false);
  const [semester, setSemester] = useState('1');

  const fetchMarks = async (sem) => {
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:3000/marks/${user._id}?semester=${sem}`);
      const data = await res.json();
      if (res.ok) {
        setSubjects(data.subjects || []);
      } else {
        setSubjects([]);
      }
    } catch (err) {
      console.error("Failed to fetch marks:", err);
      setSubjects([]);
    }
  };

  useEffect(() => {
    if (user && semester) {
      fetchMarks(semester);
    }
  }, [user, semester]);

  if (!user) {
    return <div className="marks-container"><h2>User not found. Please log in again.</h2></div>;
  }

  return (
    <div className="marks-container">
      <h1 className="marks-title">Marks Summary</h1>

      <label>Select Semester: </label>
      <select
        className="dropdown"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        <option value="1">Semester 1</option>
        <option value="2">Semester 2</option>
        <option value="3">Semester 3</option>
        <option value="4">Semester 4</option>
      </select>

      <div className="subject-header">
        <span>Subject</span>
        <span>IA</span>
        <span>Sem</span>
        <span>Grade</span>
        <span>Credits</span>
      </div>

      {subjects.map((sub, index) => (
        <div className="subject-row" key={index}>
          <span>{sub.subname}</span>
          <span>{sub.ia}</span>
          <span>{sub.sem}</span>
          <span>{sub.grade}</span>
          <span>{sub.credits}</span>
        </div>
      ))}

      <button className="toggle-button" onClick={() => setShowCalculator(!showCalculator)}>
        {showCalculator ? 'Hide Score Entry' : 'Enter Scores'}
      </button>

      {showCalculator && (
        <Gpa_Calculator
          subjects={subjects}
          setSubjects={setSubjects}
          user={user}
          semester={semester}
          refreshMarks={() => fetchMarks(semester)}
        />
      )}
    </div>
  );
}
