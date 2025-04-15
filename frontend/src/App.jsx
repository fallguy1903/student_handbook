import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Post from './Post';
import PostPage from './PostPage'
import Feedback from './Feedback';
import Feedbacks from './Feedbacks';
import Gpa_Calculator from './GPA_Calulator';

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
        </Routes>
    </Router>
  );
}

export default App;