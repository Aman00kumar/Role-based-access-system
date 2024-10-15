import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Start with null to signify no user loaded yet
  const [loading, setLoading] = useState(true); // Initial loading state
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    const token = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post('http://localhost:5001/api/refresh-token', 
        { refreshToken: token }, // Send refreshToken in the request body
        { headers: { Authorization: `Bearer ${token}` } } // Include the access token if needed
      );
      localStorage.setItem('token', response.data.accessToken); // Save the new access token
      localStorage.setItem('refreshToken', response.data.refreshToken); // Save the new refresh token
      setUser(response.data.user); // Update the user state
    } catch (error) {
      console.error('Error refreshing token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken'); // Ensure both tokens are removed
      setUser(null);
      navigate('/login'); // Redirect to login if token refresh fails
    }
  }, [navigate]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Check if token is valid by fetching user data
          await axios.get('http://localhost:5001/api/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          // If successful, set the user
          const response = await axios.get('http://localhost:5001/api/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          if (error.response?.status === 401) {
            // Token expired, attempt to refresh
            await refreshToken();
          } else {
            // For other errors or invalid token
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [refreshToken]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5001/api/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken); // Store refresh token
      navigate('/dashboard'); // Navigate to dashboard after login
    } catch (error) {
      console.error('Failed to login:', error);
      throw new Error('Failed to login');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken'); // Remove refresh token
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};








































