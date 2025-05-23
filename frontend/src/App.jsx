import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Post from './Post';
import PostPage from './PostPage'
import Feedback from './Feedback';
import Feedbacks from './Feedbacks';
import Gpa_Calculator from './Gpa_Calculator';
import Marks from './Marks';
import NotesAndAssignments from './NotesAndAssignments';
import TimeTable from './TimeTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/Gpa_Calculator" element={<Gpa_Calculator />} />
        <Route path="/Marks" element={<Marks />}/>
        <Route path="/assignments" element={<NotesAndAssignments />}/>
        <Route path="/timetable" element={<TimeTable />}/>
        </Routes>
    </Router>
  );
}

export default App;