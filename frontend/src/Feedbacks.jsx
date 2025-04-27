import { useEffect, useState } from 'react';
import './Feedbacks.css'; // External CSS

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/feedbacks', {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }

        const data = await response.json();
        setFeedbacks(data.feedbacks);

      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="feedbacks-container">
      <h1 className="heading">Feedbacks</h1>
      <ul className="feedbacks-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <li key={index} className="feedback-item">
              <h3>{feedback.title}</h3>
              <p>{feedback.feedback}</p>
              <small className="feedback-date">{formatDate(feedback.date)}</small>
            </li>
          ))
        ) : (
          <p>No feedbacks available.</p>
        )}
      </ul>
      <a href="/" className="back-link">
        <button className="back-button">Back</button>
      </a>
    </div>
  );
}
