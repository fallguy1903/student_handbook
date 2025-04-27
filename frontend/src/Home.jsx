import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS for styling

export default function Home() {
  return (
    <div className="whole">
    <div className="home-container">
      <h1 className="home-title">Welcome to Student Webbook</h1>
      <div className="grid-container">
        <Link to="/post" className="grid-item">
          <div className="icon">📢</div>
          <p>Events</p>
        </Link>
        <Link to="/feedback" className="grid-item">
          <div className="icon">📋</div>
          <p>Feedback</p>
        </Link>
        <Link to="/marks" className="grid-item">
          <div className="icon">📊</div>
          <p>Mark Details</p>
        </Link>
        <Link to="#" className="grid-item">
          <div className="icon">👤</div>
          <p>Dummy 1</p>
        </Link>
        <Link to="/notes" className="grid-item">
          <div className="icon">👨‍🏫</div>
          <p>Notes & Assignments</p>
        </Link>
        <Link to="#" className="grid-item">
          <div className="icon">🕒</div>
          <p>Dummy 3</p>
        </Link>
      </div>
    </div>
    </div>
  );
}
