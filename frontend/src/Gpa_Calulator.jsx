import './GPA_Calculator.css';

export default function Gpa_Calculator({ subjects, setSubjects }) {
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

  return (
    <div className="gpa-container">
      <h2 className="gpa-title">Enter Scores</h2>
      {subjects.map((sub, index) => (
        <div className="subject-card" key={index}>
          <p className="subject-name">{sub.subname}</p>
          <input
            className="gpa-input"
            type="text"
            placeholder="Enter IA mark"
            value={sub.ia}
            onChange={(e) => update_IA(index, e.target.value)}
          />
          <input
            className="gpa-input"
            type="text"
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
    </div>
  );
}
