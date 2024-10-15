import React, { useState } from 'react';
import axios from 'axios';
import './Collectionform.css'; // Import the CSS file

const CollectionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collectionDate: '',
    amount: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    try {
      const token = localStorage.getItem('token'); // Make sure the token is stored in localStorage

      await axios.post('http://localhost:5001/api/formdata', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccessMessage('Data submitted successfully!');
      setFormData({
        name: '',
        email: '',
        collectionDate: '',
        amount: ''
      });
    } catch (error) {
      setError('Error submitting form: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="collection-form-container">
      <h2>Submit Collection Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="collectionDate"
            value={formData.collectionDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default CollectionForm;










