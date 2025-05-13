import React, { useState } from 'react';
import './TimeTable.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periodsPerDay = 8;

const TimeTable = () => {
  const [timetable, setTimetable] = useState(
    Array(5).fill().map(() => Array(periodsPerDay).fill(''))
  );

  const [editingCell, setEditingCell] = useState({ day: null, period: null });

  const handleChange = (e, dayIndex, periodIndex) => {
    const updated = [...timetable];
    updated[dayIndex][periodIndex] = e.target.value;
    setTimetable(updated);
  };

  const handleBlur = () => {
    setEditingCell({ day: null, period: null });
  };

  const currentDayIndex = new Date().getDay() - 1; // 0 = Monday

  return (
    <div className="timetable-container">
      <h2>College Timetable</h2>
      <table className="timetable">
        <thead>
          <tr>
            <th>Day / Period</th>
            {Array.from({ length: periodsPerDay }, (_, i) => (
              <th key={i}>P{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => (
            <tr
              key={day}
              className={dayIndex === currentDayIndex ? 'highlight' : ''}
            >
              <td className="day-name">{day}</td>
              {timetable[dayIndex].map((subject, periodIndex) => (
                <td
                  key={periodIndex}
                  onClick={() => setEditingCell({ day: dayIndex, period: periodIndex })}
                  className="editable-cell"
                >
                  {editingCell.day === dayIndex && editingCell.period === periodIndex ? (
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => handleChange(e, dayIndex, periodIndex)}
                      onBlur={handleBlur}
                      autoFocus
                      className="cell-input"
                    />
                  ) : (
                    subject || <span className="placeholder">+</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
