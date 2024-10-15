import React, { useEffect, useState } from 'react';
import './UserManagement.css';  // Importing the updated CSS

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your backend API
    fetch('http://localhost:5001/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-item">
            {user.name} - {user.role}
            <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;




