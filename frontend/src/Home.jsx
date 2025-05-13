import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const location = useLocation();
  const user = location.state?.user;
  const token = location.state?.token;

  // Store user/token in localStorage on first load
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }, [user, token]);

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

          {/* No need to pass state anymore */}
          <Link to="/marks" className="grid-item">
            <div className="icon">📊</div>
            <p>Mark Details</p>
          </Link>

          <Link to="#" className="grid-item">
            <div className="icon">👤</div>
            <p>Attendance</p>
          </Link>

          <Link to="/assignments" state={{ username: user?.username }} className="grid-item">
            <div className="icon">👨‍🏫</div>
            <p>Notes & Assignments</p>
          </Link>

          <Link to="#" className="grid-item">
            <div className="icon">🕒</div>
            <p>Time Table</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
