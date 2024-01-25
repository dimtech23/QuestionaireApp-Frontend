import React, { useState } from 'react';
import '../styles/Sidebar.css'; // Import the stylesheet
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiSearch, FiBookOpen, FiSettings, FiLogOut } from 'react-icons/fi'; // Import Feather icons

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a request to the /logout endpoint on your server
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary headers, such as authorization token
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Clear client-side authentication token
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/login');
      } else {
        // Handle errors, if any
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  return (
    <div className="sidebar">
      <h3>Project X</h3>
      <Link to="" className="sidebar-link">
        <FiHome className="icon" />
        Home
      </Link>
      <Link to="" className="sidebar-link">
        <FiSearch className="icon" />
        Search
      </Link>
      <Link to="" className="sidebar-link">
        <FiBookOpen className="icon" />
        All Services
      </Link>
      {/* Add more links or design elements as needed */}
      <div className="spacer"></div>
      <Link to="" className="sidebar-link settings">
        <FiSettings className="icon" />
        Settings
      </Link>
      <Link to="/login" className="sidebar-link logout" onClick={handleLogout}>

        <FiLogOut className="icon" />
        Log Out
      </Link>
    </div>
  );
};

export default Sidebar;
