import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home.jsx';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import MouseIndicator from './components/MouseIndicator.jsx';

function App() {
  return (
    <>
      <MouseIndicator />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
