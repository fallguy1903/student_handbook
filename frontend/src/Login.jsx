import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
  const [regno, setRegno] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (evt) => {
    evt.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regno, password })
    });

    const data = await response.json();
    if (data.user === 'null') {
      setError("Incorrect credentials");
      setRegno("");
      setPassword("");
    } else {
      localStorage.setItem("token", data.token);
      navigate("/home", { state: { token: data.token, user: data.user } });
    }
  }

  return (
    <div className="page-container">
      <div className="image-container"></div>
      <div className="form-container">
        <div className="form-wrapper">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleLogin} className="login-form">
            <input type='text' name='regno' placeholder='Registration Number'
              onChange={(e) => setRegno(e.target.value)} value={regno} autoComplete="off" />
            <input type='password' name='password' placeholder='Password'
              onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="off" />
            <button type="submit">Login</button>
            {error && <p className="error-text">{error}</p>}
            <a href='/signup' className="signup-link">Signup</a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
