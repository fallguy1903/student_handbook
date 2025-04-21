import { useState } from 'react';
import Gpa_Calculator from './GPA_Calulator';
import './Marks.css'; // Import the CSS

export default function Marks() {
  const [subjects, setSubjects] = useState([
    { subcode: "CA3101", subname: "FSD", ia: 0, sem: 0, grade: '', credits: 4.5 },
    { subcode: "CA3102", subname: "IOT", ia: 0, sem: 0, grade: '', credits: 4 }
  ]);

  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="marks-container">
      <h1 className="marks-title">Marks Summary</h1>

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
        <Gpa_Calculator subjects={subjects} setSubjects={setSubjects} />
      )}
    </div>
  );
}
