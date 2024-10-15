import React, { useState } from 'react';
import './AddUser.css'; // Import your CSS file

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, role };

    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Please log in to add a user.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMessage('User added successfully!');
        setEmail('');
        setRole('');
      } else {
        const errorData = await response.json();
        setMessage(`Error adding user: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Error adding user');
    }
  };

  return (
    <div className="add-user-container">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add User</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddUser;






