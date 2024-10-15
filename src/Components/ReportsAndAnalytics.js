import React from 'react';
import PropTypes from 'prop-types';
import './ReportsAndAnalytics.css';

const ReportsAndAnalytics = ({ collections }) => {
  
  if (!Array.isArray(collections)) {
    return <p>No data available for reports and analytics.</p>;
  }

  return (
    <div className="reports-and-analytics">
      <h2>Reports & Analytics</h2>
      <ul>
        {collections.map((collection, index) => (
          <li key={index}>
            {collection.name ? collection.name : 'No name'} - {collection.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReportsAndAnalytics.propTypes = {
  collections: PropTypes.array.isRequired,
};

export default ReportsAndAnalytics;



