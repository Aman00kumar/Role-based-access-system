import React from 'react';
import './ManageFormsOverview.css'; // Import a CSS file for styling

const ManageFormsOverview = () => {
  return (
    <div className="manage-forms-overview-container">
      <h1>Manage Forms</h1>
      
      <div className="section">
        <h2>Overview</h2>
        <p>In the "Manage Forms" section, you can perform various operations on form submissions. This includes viewing submitted forms, editing details, and deleting entries as needed.</p>
      </div>

      <div className="section">
        <h2>Features</h2>
        <ul className="features-list">
          <li>View all submitted forms</li>
          <li>Edit form details</li>
          <li>Delete forms</li>
          <li>Filter and search forms based on different criteria</li>
          <li>Export form data to Excel</li>
        </ul>
      </div>

      <div className="section">
        <h2>How to Use</h2>
        <p>To manage forms, navigate to the "Manage Forms" section from the dashboard. You'll be presented with a table of all form submissions. Use the provided options to filter, view, edit, or delete the forms as required.</p>
      </div>
    </div>
  );
};

export default ManageFormsOverview;



