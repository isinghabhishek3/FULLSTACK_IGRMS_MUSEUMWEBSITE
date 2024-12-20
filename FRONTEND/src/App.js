import React from 'react'; // Add this line to import React
import 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link,
  Routes
} from "react-router-dom";
import AdminLogin from './components/MainComponents/AdminLogin';
import Homepage from './components/MainComponents/Homepage';
// import AddToDatabase from './components/MainComponents/AddToDatabase';
import Uploadme from './components/MainComponents/Uploadme';
import Gallery from './components/MainComponents/Gallery';
import AdminHome from './components/MainComponents/AdminHome';
import EDUGallery from './components/MainComponents/EDUGallery';
import EditData from './components/MainComponents/EditData';
import PartiData from './components/MainComponents/PartiData';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Admin/:id" element={<AdminHome />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/upload/:id" element={<Uploadme/>} />
          <Route path="/uploads" element={<Gallery/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/data/:stuffId" element={<PartiData/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/gallery/:id" element={<EDUGallery/>} />
          <Route path="/editData/:id" element={<EditData/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
