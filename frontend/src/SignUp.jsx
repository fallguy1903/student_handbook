import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


export default function SignUp(){
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[regno,setRegno] = useState('');
    const navigate = useNavigate();
    async function handleSubmit(e)
    {
        e.preventDefault();
        console.log(JSON.stringify({regno,username,password}))
        const response = await fetch('http://localhost:3000/register',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({regno,username,password})
        })
        const data = await response.json();

        if(data)
        {
            console.log("register successfull")
            navigate("/home", { state: { user: {username: username} } } );
        }
        else    console.log("Not successfull")
    }
    return(
        <>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='username' onChange={(e)=>setUsername(e.target.value)} value={username} />
                <input type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password} />
                <input type="text" placeholder='regno' onChange={(e)=>setRegno(e.target.value)} value={regno} />
                <button>Register</button>
            </form>
        </>
    )
}