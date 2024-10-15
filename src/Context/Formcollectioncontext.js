import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FormCollectionContext = createContext();

export const FormCollectionProvider = ({ children }) => {
  const [formData, setFormData] = useState([]);

  // Fetch data from the backend
  const fetchFormData = async () => {
    try {
      const token = localStorage.getItem('token'); // Make sure token is retrieved
      const response = await axios.get('http://localhost:5001/api/formdata', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  // Add new form data
  const addFormData = async (data) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token here
      const response = await axios.post('http://localhost:5001/api/formdata', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData([...formData, response.data]);
    } catch (error) {
      console.error('Error adding form data:', error);
    }
  };

  // Update form data
  const updateFormData = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token here
      const response = await axios.put(`http://localhost:5001/api/formdata/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData(formData.map((item) => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error('Error updating form data:', error);
    }
  };

  // Delete form data
  const removeFormData = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token here
      await axios.delete(`http://localhost:5001/api/formdata/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData(formData.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error removing form data:', error);
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <FormCollectionContext.Provider value={{ formData, addFormData, updateFormData, removeFormData }}>
      {children}
    </FormCollectionContext.Provider>
  );
};

export const useFormCollection = () => useContext(FormCollectionContext);

 








