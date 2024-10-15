import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Supervisordashboard.css';
import SummaryCard from './SummaryCard';
import PerformanceOverview from './PerformanceOverview';
import ReportsAndAnalytics from './ReportsAndAnalytics';



const SupervisorDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [recentCollections, setRecentCollections] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data: employeeData } = await axios.get('http://localhost:5001/api/totalEmployees', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { data: approvals } = await axios.get('http://localhost:5001/api/pendingApprovals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { data: collections } = await axios.get('http://localhost:5001/api/recentCollections', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTotalEmployees(employeeData.totalEmployees || 0);
        setPendingApprovals(approvals.pendingApprovals || 0);
        setRecentCollections(collections || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setTotalEmployees(0);
        setPendingApprovals(0);
        setRecentCollections([]);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="supervisor-dashboard">
      <h1>Supervisor Dashboard</h1>
      <div className="summary-cards">
        <SummaryCard title="Total Employees" value={totalEmployees} />
        <SummaryCard title="Pending Approvals" value={pendingApprovals} />
        <SummaryCard title="Recent Collections" value={recentCollections.length} />
      </div>
      {recentCollections.length > 0 && <PerformanceOverview collections={recentCollections} />}
      {recentCollections.length > 0 && <ReportsAndAnalytics collections={recentCollections} />}
    </div>
  );
};

export default SupervisorDashboard;









