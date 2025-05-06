import './GPA_Calculator.css';
import { useState } from 'react';

export default function Gpa_Calculator({ subjects, setSubjects, user, semester }) {
  const [newSubject, setNewSubject] = useState({
    subname: '',
    ia: 0,
    sem: 0,
    grade: '',
    credits: 0
  });

  const handleNewSubjectChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === 'credits') {
      parsedValue = parseFloat(value) || 0;
    }

    setNewSubject({ ...newSubject, [name]: parsedValue });
  };

  const addSubject = () => {
    if (!newSubject.subname || newSubject.credits <= 0) {
      alert('Enter subject name and valid credits');
      return;
    }

    const subjectToAdd = { ...newSubject, ia: 0, sem: 0, grade: '', semester };
    setSubjects([...subjects, subjectToAdd]);
    setNewSubject({ subname: '', ia: 0, sem: 0, grade: '', credits: 0 });
  };

  const update_IA = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].ia = parseFloat(value) || 0;
    setSubjects(newSubjects);
  };

  const update_Sem = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].sem = parseFloat(value) || 0;
    setSubjects(newSubjects);
  };

  const update_grade = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].grade = value;
    setSubjects(newSubjects);
  };

  const calculate_gpa = () => {
    let total_credits = 0;
    let total_points = 0;

    for (let sub of subjects) {
      if (sub.ia === 0 || sub.sem === 0 || sub.grade === '') {
        alert("Please fill all details.");
        return;
      }

      let points = 0;
      if (sub.grade === 'o') points = 10;
      else if (sub.grade === 'a+') points = 9;
      else if (sub.grade === 'a') points = 8;
      else if (sub.grade === 'b+') points = 7;
      else if (sub.grade === 'b') points = 6;

      total_credits += sub.credits;
      total_points += points * sub.credits;
    }

    const gpa = (total_points / total_credits).toFixed(2);
    alert(`Your GPA is: ${gpa}`);
  };

  const saveMarks = async () => {
    try {
      const response = await fetch('http://localhost:3000/marks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user._id,
          semester,
          subjects
        })
      });

      const result = await response.json();
      if (response.ok) {
        alert('Marks saved successfully!');
      } else {
        alert(result.msg || 'Failed to save marks');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving marks');
    }
  };

  return (
    <div className="gpa-container">
      <h2 className="gpa-title">Enter Scores</h2>

      <div className="subject-card">
        <input
          className="gpa-input"
          type="text"
          name="subname"
          placeholder="Subject Name"
          value={newSubject.subname}
          onChange={handleNewSubjectChange}
        />
        <input
          className="gpa-input"
          type="number"
          name="credits"
          step="0.1"
          placeholder="Credits"
          value={newSubject.credits}
          onChange={handleNewSubjectChange}
        />
        <button className="gpa-button" onClick={addSubject}>Add Subject</button>
      </div>

      {subjects.map((sub, index) => (
        <div className="subject-card" key={index}>
          <p className="subject-name">{sub.subname}</p>
          <input
            className="gpa-input"
            type="number"
            step="0.1"
            placeholder="Enter IA mark"
            value={sub.ia}
            onChange={(e) => update_IA(index, e.target.value)}
          />
          <input
            className="gpa-input"
            type="number"
            step="0.1"
            placeholder="Enter Sem mark"
            value={sub.sem}
            onChange={(e) => update_Sem(index, e.target.value)}
          />
          <select
            className="gpa-select"
            value={sub.grade}
            onChange={(e) => update_grade(index, e.target.value)}
          >
            <option value="">Select Grade</option>
            <option value="o">O</option>
            <option value="a+">A+</option>
            <option value="a">A</option>
            <option value="b+">B+</option>
            <option value="b">B</option>
          </select>
        </div>
      ))}

      <button className="gpa-button" onClick={calculate_gpa}>Calculate GPA</button>
      <button className="gpa-button" onClick={saveMarks}>Save Marks</button>
    </div>
  );
}
