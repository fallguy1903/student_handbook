import { useState } from 'react';
import './Feedback.css'; // Import the external CSS file

export default function Feedback() {
    const [title, setTitle] = useState('');
    const [feedback, setFeedback] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleLogin = async (evt) => {
        evt.preventDefault();
        console.log(JSON.stringify({ title, feedback }));
        const response = await fetch('http://localhost:3000/feedback', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, feedback })
        });
        const data = await response.json();
        if (data)
            console.log(data.message);
    };

    return (
        <div className="container">
            <h1>Feedbacks</h1>
            <form onSubmit={handleLogin} className="form">
                <input
                    type='text'
                    name='Title'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder='Enter Title'
                    className="input"
                />
                <textarea
                    name='Feedback'
                    onChange={(e) => setFeedback(e.target.value)}
                    value={feedback}
                    placeholder='Enter Feedback'
                    className="textarea"
                />
                <button type="submit" className="button">Submit Feedback</button>
            </form>
            <a href="feedbacks" className="link">Show Feedbacks</a>
        </div>
    );
}
