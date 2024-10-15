import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceOverview = ({ collections }) => {
  if (collections.length === 0) {
    return <p>No performance data available.</p>;
  }

  const data = {
    labels: collections.map(item => item.name || 'No name'),
    datasets: [
      {
        label: 'Amount',
        data: collections.map(item => item.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="performance-overview">
      <h2>Performance Overview</h2>
      <Bar data={data} />
    </div>
  );
};

PerformanceOverview.propTypes = {
  collections: PropTypes.array.isRequired,
};

export default PerformanceOverview;



