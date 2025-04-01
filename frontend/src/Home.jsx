import { useLocation } from "react-router-dom";

export default function Home(){
    const location = useLocation();
    
    return(
        
        <div>Home Page, Welcome {location.state.user.username + '_' + location.state.user.batch}</div>
    )
}