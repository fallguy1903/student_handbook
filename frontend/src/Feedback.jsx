import {useState} from 'react';

export default function Feedback()
{
    const [title,setTitle] = useState('');
    const [feedback,setFeedback] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));
    const handleLogin = async (evt)=>{
        evt.preventDefault();
        console.log(JSON.stringify({title,feedback}))
        const response = await fetch('http://localhost:3000/feedback',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({title,feedback})
        })
        const data = await response.json();
        if(data)
            console.log(data.message)
    }



    return(
        <>
        <h1>FEEDBACKS</h1>
        <form onSubmit={handleLogin}>
        <input type='text' name='Title' onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter Title'></input><br></br>
        <textarea type='text' name='Feedback' onChange={(e)=>setFeedback(e.target.value)} value={feedback} placeholder='Enter Feedback'></textarea><br></br>
        <button type="submit">Submit Feedback</button>
        </form>
        <a href="feedbacks">Show Feedbacks</a>
        </>
    )
}