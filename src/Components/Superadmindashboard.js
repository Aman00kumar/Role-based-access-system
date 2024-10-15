import React from 'react';
import './SuperAdminDashboard.css'; // Optional: CSS for styling

const SuperAdminDashboard = () => {
  return (
    <div className="superadmin-dashboard">
      <h1>Super Admin Dashboard</h1>
      
      <section className="dashboard-section">
        <h2>User Management</h2>
        <p>Manage users, roles, and permissions.</p>
        <ul>
          <li><a href="/usermanagement">View All Users</a></li>
          <li><a href="/adduser">Add New User</a></li>
          <li><a href="/rolespermissions">Manage Roles & Permissions</a></li>
        </ul>
      </section>
      
      <section className="dashboard-section">
        <h2>System Settings</h2>
        <p>Configure system-wide settings and view system logs.</p>
        <ul>
          <li><a href="/systemsettings">System Configuration</a></li>
          <li><a href="/integrations">Manage Integrations</a></li>
          <li><a href="/systemlogs">View System Logs</a></li>
        </ul>
      </section>
      
      <section className="dashboard-section">
        <h2>Reports and Analytics</h2>
        <p>Access detailed reports and analytics.</p>
        <ul>
          <li><a href="/activityreports">User Activity Reports</a></li>
          <li><a href="/datastatistics">Data Statistics</a></li>
          <li><a href="/performance">System Performance</a></li>
        </ul>
      </section>
      
      <section className="dashboard-section">
        <h2>Security and Compliance</h2>
        <p>Manage security policies and compliance reports.</p>
        <ul>
          <li><a href="/securitysettings">Security Settings</a></li>
          <li><a href="/compliancereports">Compliance Reports</a></li>
          <li><a href="/auditlogs">Audit Logs</a></li>
        </ul>
      </section>
      
      <section className="dashboard-section">
        <h2>Announcements and Notifications</h2>
        <p>Post announcements and manage notifications.</p>
        <ul>
          <li><a href="/postannouncement">Post New Announcement</a></li>
          <li><a href="/managenotifications">Manage Notifications</a></li>
        </ul>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;


