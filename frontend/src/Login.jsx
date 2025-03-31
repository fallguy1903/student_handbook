import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from "react-router-dom";
import './App.css'

function Login() {
  const [regno, setRegno] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (evt)=>{
    evt.preventDefault();
    console.log(JSON.stringify({regno,password}))
    const response = await fetch('http://localhost:3000/login',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({regno,password})
    })
    
    const data = await response.json();
    if(data.user == 'null')
        {
            console.log("Incorrect Credentials")
            setRegno("");
            setPassword("");
            navigate("/");
        }
    else
        {
          console.log(data.user.username)
          navigate("/home", { state: { user: data.user } } );
        }
    
    
  }
  return (
    <>
        <h1>Login Page</h1>
          <form onSubmit={handleLogin}>
          <input type='text' name='regno' onChange={(e)=>setRegno(e.target.value)} value={regno} placeholder='regno'></input>
          <input type='password' name='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='passowrd'></input>
          <button type="submit">Login</button>
        </form>
        <a href='/signup'>Signup</a>
        
    </>
  )
}

export default Login
