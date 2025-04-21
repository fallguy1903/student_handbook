import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [regno, setRegno] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regno, username, password, department, batch })
    });

    const data = await response.json();
    if (data.msg) {
      navigate("/home", { state: { user: { username, batch } } });
    } else {
      alert(data.message || "Registration failed");
    }
  }

  return (
    <div className="page-container">
      <div className="image-container"></div>
      <div className="form-container">
        <div className="form-wrapper">
          <h1 className="login-title">Signup</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <input type="text" placeholder='Registration Number' onChange={(e) => setRegno(e.target.value)} value={regno} />
            <select onChange={(e) => setDepartment(e.target.value)} value={department} required>
              <option value="">Select Department</option>
              <option value="MCA">M.C.A</option>
              <option value="BCA">B.C.A</option>
              <option value="BTech">B.Tech</option>
              <option value="MTech">M.Tech</option>
            </select>
            <select onChange={(e) => setBatch(e.target.value)} value={batch} required>
              <option value="">Select Batch</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <button type="submit">Register</button>
          </form>
          <a href="/">Already have an account?</a>
        </div>  
      </div>
    </div>
  );
}

export default SignUp;
