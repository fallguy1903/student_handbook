import { Link, useLocation } from "react-router-dom";

export default function Home(){
    const location = useLocation();
    
    return(
        
        <div>
            Home Page, Welcome {location.state.user.username + '_' + location.state.user.batch}
            <p>
                <Link to={"/post"}>E V E N T S</Link>
                <Link to={"/feedback"}> Feedback</Link>
                <Link to={"/Gpa_Calculator"}> Mark details</Link>
            </p>
        </div>
    )
}