import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { NavLink } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Men from './MenData/Men';
import Women from './Header/Women';
import Footer from './Footer/Footer';
import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';

function App() {
  return (
    <>
    
    <Router>
      <Routes> 
        <Route path='/' element={<Men />} /> 
        <Route path='/women' element={<Women />} />
        <Route path='/men'  element={<Men />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
        
        {/* <Route path='/' element={<Home />} />
        <Route path="/home"  element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
    {/* <Footer /> */}
    </>
    

    // <>
    //   <Home />
    //   <Navigation />
    // </>
  );
}

export default App;
