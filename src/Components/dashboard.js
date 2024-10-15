import React from 'react';
import './Dashboards.css'; // Import a CSS file for styling

const Dashboards = () => {
  return (
    <div className="dashboards-container">
      <h1>Dashboards</h1>
      <p>Here you can access various dashboards based on your role and permissions.</p>

      <div className="dashboard-links">
        <h2>Available Dashboards</h2>
        <ul>
          <li><a href="/manager-dashboard">Manager Dashboard</a></li>
          <li><a href="/employee-dashboard">Employee Dashboard</a></li>
          <li><a href="/supervisor-dashboard">Supervisor Dashboard</a></li>
          <li><a href="/superadmin-dashboard">Superadmin Dashboard</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboards;


