import { useEffect, useState } from 'react';

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

  return (
    <>
      <h1>Feedbacks</h1>
      <ul>
        {feedbacks.map((feedback, index) => (
          <li key={index}>{feedback.title}: {feedback.feedback}</li>
        ))}
      </ul>
      <a href="/"><button>Back</button></a>
    </>
  );
}
