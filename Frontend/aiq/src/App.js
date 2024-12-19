
import React/*, { useContext }*/ from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { Button } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/DashBoard';
import Interview from './pages/Interview';
import ResumeUpload from './pages/ResumeUpload';
import ThemeContextProvider /*,{ ColorModeContext }*/ from './ThemeContext';

const App = () => {
  //const colorMode = useContext(ColorModeContext);

  return (
    <ThemeContextProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/interviewOn/:subject" element={<Interview />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ResumeUpload" element={<ResumeUpload />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </ThemeContextProvider>
  );
};

export default App;
