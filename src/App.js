// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InspectionForm from './pages/InspectionForm';
import InspectionList from './pages/InspectionList';
import InspectionReport from './pages/InspectionReport';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inspection/new" element={<InspectionForm />} />
            <Route path="/inspection/edit/:id" element={<InspectionForm />} />
            <Route path="/inspection/list" element={<InspectionList />} />
            <Route path="/inspection/report" element={<InspectionReport />} />
            <Route path="/inspection/:id" element={<InspectionReport />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;