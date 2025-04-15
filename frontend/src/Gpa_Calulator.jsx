import {useState,useEffect} from 'react';

export default function Gpa_Calculator(){
    let tot_credit = 0, gpa = 0;
    const [subjects,setSubjects] = useState([{subcode:"CA3101",subname:"FSD",ia:0,sem:0,grade:'',credits:4.5},{subcode:"CA3102",subname:"IOT",ia:0,sem:0,grade:'',credits:4}])
    const [IAmark,setIAmark] = useState(0)
    const [semmark,setsemmark] = useState(0)
    
    const update_IA = (index, value) => {
        const newSubjects = [...subjects];
        newSubjects[index].ia = parseFloat(value) || 0;
        setSubjects(newSubjects);
    };
    
    const update_Sem = (index, value) => {
        const newSubjects = [...subjects];
        newSubjects[index].sem = parseFloat(value) || 0;
        setSubjects(newSubjects);
    };
    
    const update_grade = (index,value) =>{
        const newSubjects = [...subjects];
        newSubjects[index].grade = value;
        setSubjects(newSubjects);
    }

    const calculate_gpa = () =>{
        console.log("Calculating CGPA...")
        let gpa = 0;
        let points = 0;
        subjects.map((sub)=>{
            if(sub.ia==0 || sub.sem==0)
                return <p>Enter all the marks to calculate GPA</p>
            else
            {
                
                tot_credit+=sub.credits;
                if(sub.grade=='o')  points = 10
                else if(sub.grade=='a+') points = 9
                else if(sub.grade=='a') points = 8
                else if(sub.grade=='b+') points = 7
                else if(sub.grade=='b') points = 6
                else points = -1;  
            }
            gpa+=points*sub.credits;
        })
        console.log("Total Credits:",tot_credit)
        gpa/=tot_credit;
        subjects.map((value)=>{
            console.log("IA:",value.ia,"sem:",value.sem,"grade:",value.grade)
        })
        console.log("GPA is:",gpa)
    }
    return(
        <>
            <h1>Mark Details</h1>
            {subjects.map((sub, index) => (
                <div key={index}>
                    <p>{sub.subname}</p>
                    <input 
                        type="number" 
                        placeholder='Enter IA mark' 
                        onChange={(e) => update_IA(index, e.target.value)} 
                    />
                    <input 
                        type="number" 
                        placeholder='Enter Sem mark' 
                        onChange={(e) => update_Sem(index, e.target.value)} 
                    />
                    <input
                        type="text"
                        placeholder='Enter Grade Acquired'
                        onChange={(e)=> update_grade(index,e.target.value)}
                    />
                </div>
            ))}
            <br /><br/><button onClick={calculate_gpa}>Calculate GPA</button>
        </>
    )
}