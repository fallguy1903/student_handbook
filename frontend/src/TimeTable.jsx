import React, { useState, useEffect } from 'react';
import './TimeTable.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periodsPerDay = 8;

const TimeTable = () => {
  const [timetable, setTimetable] = useState(null);
  const [editingCell, setEditingCell] = useState({ day: null, period: null });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Fetch timetable data on component mount
  useEffect(() => {
    fetch('http://localhost:3000/timetable', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.timetable) {
          setTimetable(data.timetable);
        } else {
          // Initialize default timetable if none exists
          const defaultTimetable = {
            days: days.map((day) => ({
              name: day,
              periods: Array(periodsPerDay).fill({ subject: '' }),
            })),
          };
          setTimetable(defaultTimetable);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching timetable:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e, dayIndex, periodIndex) => {
    const updatedTimetable = { ...timetable };
    updatedTimetable.days[dayIndex].periods[periodIndex] = {
      subject: e.target.value,
    };
    setTimetable(updatedTimetable);
  };

  const handleCellClick = (dayIndex, periodIndex) => {
    setEditingCell({ day: dayIndex, period: periodIndex });
  };

  const handleBlur = () => {
    setEditingCell({ day: null, period: null });
  };

  const saveTimetable = () => {
    setSaving(true);
    fetch('http://localhost:3000/timetable', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(timetable),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Timetable saved!');
        setSaving(false);
      })
      .catch((err) => {
        console.error('Error saving timetable:', err);
        alert('Failed to save timetable.');
        setSaving(false);
      });
  };

  if (loading) {
    return <div>Loading timetable...</div>;
  }

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
          {timetable.days.map((day, dayIndex) => (
            <tr
              key={day.name}
              className={dayIndex === new Date().getDay() - 1 ? 'highlight' : ''}
            >
              <td className="day-name">{day.name}</td>
              {day.periods.map((period, periodIndex) => (
                <td
                  key={periodIndex}
                  className="editable-cell"
                  onClick={() => handleCellClick(dayIndex, periodIndex)}
                >
                  {editingCell.day === dayIndex && editingCell.period === periodIndex ? (
                    <input
                      type="text"
                      value={period.subject}
                      onChange={(e) => handleChange(e, dayIndex, periodIndex)}
                      onBlur={handleBlur}
                      autoFocus
                      className="cell-input"
                    />
                  ) : (
                    <span>{period.subject || <span className="placeholder">+</span>}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveTimetable} disabled={saving} className="save-button">
        {saving ? 'Saving...' : 'Save Timetable'}
      </button>
    </div>
  );
};

export default TimeTable;
