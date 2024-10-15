import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Managerdashboard.css';

const ManagerDashboard = () => {
  const [formData, setFormData] = useState([]);
  const [totalCollection, setTotalCollection] = useState(0);
  const [todaysCollection, setTodaysCollection] = useState(0);
  const [todaysStock, setTodaysStock] = useState(0); // Fixed value, adjust if necessary
  const [todaysProjection, setTodaysProjection] = useState(0); // Fixed value, adjust if necessary

  const fetchFormData = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5001/api/formdata', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('API Response:', response.data); // Check the full response
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching form data:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

      // Calculate total collection
      const total = formData.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
      setTotalCollection(total);

      // Calculate today's total collection
      const todaysTotal = formData
        .filter(item => new Date(item.collectionDate).toISOString().split('T')[0] === today)
        .reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
      setTodaysCollection(todaysTotal);

      setTodaysStock(0); // Set to 0 or calculate if necessary
      setTodaysProjection(0); // Set to 0 or calculate if necessary
    };

    calculateTotals();
  }, [formData]);

  return (
    <div className="manager-dashboard">
      <div className="dashboard-summary">
        <div className="summary-item total-collection">
          <h3>Total Collection</h3>
          <p>{`$${totalCollection.toFixed(2)}`}</p>
        </div>
        <div className="summary-item todays-collection">
          <h3>Today's Collection</h3>
          <p>{`$${todaysCollection.toFixed(2)}`}</p>
        </div>
        <div className="summary-item todays-stock">
          <h3>Today's Stock</h3>
          <p>{`$${todaysStock.toFixed(2)}`}</p>
        </div>
        <div className="summary-item todays-projection">
          <h3>Today's Projection</h3>
          <p>{`$${todaysProjection.toFixed(2)}`}</p>
        </div>
      </div>
      <div className="data-table">
        <h2>Today's Collection Data</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Collection Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{new Date(data.collectionDate).toLocaleDateString()}</td>
                <td>{`$${data.amount}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerDashboard;

























