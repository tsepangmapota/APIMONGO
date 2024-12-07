// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Optional: You can create a CSS file for additional styling

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link> {/* Updated to point to the home route */}
                </li>
                <li>
                    <Link to="/staffmanagement">Staff Management</Link> {/* Ensure the path matches */}
                </li>
                <li>
                    <Link to="/procurementmanagement">Procurement Management</Link> {/* Ensure the path matches */}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
