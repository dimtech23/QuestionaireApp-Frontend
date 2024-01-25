// Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import HealthInsuranceForm  from '../components/HealthInsuranceForm';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard" style={{ backgroundColor: '#282828' }}>
      <Sidebar />
      <div className="dashboard-content">
        <HealthInsuranceForm  />
      </div>
    </div>
  );
};

export default Dashboard;
