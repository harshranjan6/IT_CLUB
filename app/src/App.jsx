import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Project from './Components/Project';
import Events from './Components/Events';
import Navbar from './Components/Navbar';
import Contect from './Components/Contect';
import Footer from './Components/Footer';
import Resources from './Components/Resources';
import Quiz from './Components/Quiz';
import PrivateRoute from './Components/PrivateRoute';
import PrivateAdminRoute from './Components/PrivateAdminRoute';
import Login from './Components/Login';
import HandleRegister from './Components/HandleRegister';
import './App.css';
import HackathonDetails from './pages/Hackathon/HackathonDetails';
import HackathonList from './pages/Hackathon/HackthonList';
import HackathonLeaderboard from './pages/Hackathon/HackathonLeaderboard';
import HackathonSubmit from './pages/Hackathon/HackathonSubmit';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageHackathons from './pages/Admin/ManageHackathons';
import ManageSubmissions from './pages/Admin/ManageSubmissions';
import ManageQuestions from './pages/Admin/ManageQuestions';
import Sidebar from './pages/Admin/Sidebar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/sidebar' element= {<Sidebar/>}></Route>
        
        <Route path='/about' element={<About />} />

        <Route path='/projects' element={<Project />} />

        <Route path='/resource' element={<Resources />} />

        <Route path='/events' element={<Events />} />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<HandleRegister />}/>

        <Route path='/quiz' element={<Quiz />} />

        <Route path='/admin/dashboard' element={<PrivateAdminRoute><AdminDashboard /></PrivateAdminRoute>  }></Route>
        <Route path='/admin/hackathons' element= {<PrivateAdminRoute><ManageHackathons/></PrivateAdminRoute>}></Route>
        <Route path='/admin/submissions' element={<PrivateAdminRoute><ManageSubmissions/></PrivateAdminRoute> }></Route>
        <Route path='/admin/questions' element={<PrivateAdminRoute><ManageQuestions/></PrivateAdminRoute>}></Route>   

        <Route path='/events/hackathon' element={<HackathonList />}></Route>
        <Route path='/events/hackathon/:id' element={<HackathonDetails />}></Route>
        <Route path='/events/hackathon/:id/submit' element={<PrivateRoute><HackathonSubmit /></PrivateRoute>}></Route>
        <Route path='/events/hackathon/:id/leaderboard' element={<HackathonLeaderboard />}></Route>

        <Route path='/contact' element={<Contect />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


