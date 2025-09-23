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
import AddQuestion from './Components/AddQuestion';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Components/Login';
import HandleRegister from './Components/HandleRegister';
import './App.css';
import HackathonDetails from './pages/Hackathon/HackathonDetails';
import HackathonList from './pages/Hackathon/HackthonList';
import HackathonLeaderboard from './pages/Hackathon/HackathonLeaderboard';
import HackathonSubmit from './pages/Hackathon/HackathonSubmit';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Project />} />
        <Route path='/resource' element={<Resources />} />
        <Route path='/events' element={<Events />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<HandleRegister />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/add-question' element={<PrivateRoute><AddQuestion /></PrivateRoute>} />
        <Route path='/hackathonDetails' element={<HackathonDetails />}></Route>
        <Route path='/hackathonList' element={<HackathonList />}></Route>
        <Route path='/hackathonLeaderBoard' element={<HackathonLeaderboard />}></Route>
        <Route path='/hackathonSubmit' element={<HackathonSubmit />}></Route>
        <Route path='/contact' element={<Contect />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
