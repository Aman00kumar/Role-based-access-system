import React from 'react';
import './ViewReports.css'; // Import a CSS file for styling

const ViewReports = () => {
  
  return (
    <div className="view-reports-container">
      <h1>View Reports</h1>

      <div className="section">
        <h2>Overview</h2>
        <p>The "View Reports" section provides comprehensive insights into various aspects of the application. Here, you can access different types of reports to monitor performance, track key metrics, and analyze data trends.</p>
      </div>

      <div className="section">
        <h2>Available Reports</h2>
        <ul className="reports-list">
          <li><strong>Summary Report:</strong> A high-level overview of key metrics and performance indicators.</li>
          <li><strong>Detailed Analytics:</strong> In-depth analysis of form submissions, including trends and patterns.</li>
          <li><strong>User Activity Report:</strong> Insights into user actions and activity within the application.</li>
          <li><strong>Custom Reports:</strong> Generate and view reports based on specific criteria or filters.</li>
        </ul>
      </div>

      <div className="section">
        <h2>How to Access Reports</h2>
        <p>To access reports, navigate to the "View Reports" section from the dashboard. Select the desired report type from the available options. You can apply filters and customize the report to suit your needs. Reports can be exported for offline analysis if required.</p>
      </div>

      <div className="section">
        <h2>Help & Support</h2>
        <p>If you need assistance with viewing or understanding reports, please visit our <a href="/help">Help & Support</a> section or contact our support team for further guidance.</p>
      </div>
    </div>
  );
};

export default ViewReports;

