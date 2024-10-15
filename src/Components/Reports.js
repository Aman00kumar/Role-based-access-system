import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Reports.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  
  const [formData, setFormData] = useState([]);
  const [summary, setSummary] = useState({ total: 0, average: 0, count: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/formdata', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched Data:', response.data); // Verify if data is fetched correctly

        setFormData(response.data);
        calculateSummary(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    fetchData();
  }, []);

  const calculateSummary = (data) => {
    const total = data.reduce((acc, item) => acc + (item.amount || 0), 0);
    const count = data.length;
    const average = count ? (total / count) : 0;
    setSummary({ total, average, count });
  };

  return (
    <div className="reports">
      <h1>Reports</h1>
      <div className="summary-cards">
        <div className="card">
          <h3>Total Collections</h3>
          <p>{summary.total.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Average Collection</h3>
          <p>{summary.average.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Forms</h3>
          <p>{summary.count}</p>
        </div>
      </div>

      <div className="chart-container">
        <Bar
          data={{
            labels: formData.map(item => new Date(item.collectionDate).toLocaleDateString()),
            datasets: [{
              label: 'Collections',
              data: formData.map(item => item.amount || 0),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }]
          }}
          options={{
            scales: {
              x: {
                type: 'category',
                title: { display: true, text: 'Collection Date' },
              },
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Amount' },
              },
            }
          }}
        />
      </div>
    </div>
  );
};

export default Reports;




