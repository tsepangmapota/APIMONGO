// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import StaffManagement from './StaffManagement';
import ProcurementManagement from './ProcurementManagement'; // Ensure this is the correct import
import './App.css';
import HomePage from './HomePage';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Corporate Staff Management System</h1>
                </header>
                <NavBar />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/staffmanagement" element={<StaffManagement />} />
                        <Route path="/procurementmanagement" element={<ProcurementManagement />} /> 
                    </Routes>
                </main>
                <footer className="App-footer">
                    <p>© {new Date().getFullYear()} Corporate Staff Management System</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
