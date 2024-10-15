import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './Formcollection.css';
import { useAuth } from '../Context/AuthContext';

const FormCollection = () => {
  
  const { user } = useAuth();
  const [formCollection, setFormCollection] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name'); // New state for filter selection

  const [file, setFile] = useState(null); // Define file state

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/formdata', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormCollection(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error.response ? error.response.data : error.message);
      }
    };
    fetchData();
  }, [user]);

  const handleEditClick = (index) => {
    const correctIndex = formCollection.findIndex(item => item._id === paginatedData[index]._id);
    if (correctIndex !== -1) {
      setEditIndex(correctIndex);
      setEditData({ ...formCollection[correctIndex] });
    } else {
      console.error('Error: Unable to find the correct data for editing.');
    }
  };

  const handleDeleteClick = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/formdata/${formCollection[index]._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormCollection(formCollection.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting form data:', error.response ? error.response.data : error.message);
    }
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5001/api/formdata/${editData._id}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedCollection = formCollection.map((item, index) =>
        index === editIndex ? editData : item
      );
      setFormCollection(updatedCollection);
      setEditIndex(null);
      setEditData(null);
    } catch (error) {
      console.error('Error updating form data:', error.response ? error.response.data : error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const filteredData = formCollection
  .filter((data) => {
    if (user.role === 'employee') {
      const dataEmail = data.email ? data.email.trim().toLowerCase() : '';
      const userEmail = user.email ? user.email.trim().toLowerCase() : '';
      return dataEmail === userEmail;
    }
    return true;
  })
  .filter((data) => {
    const name = data.name ? data.name.toLowerCase() : '';
    const email = data.email ? data.email.toLowerCase() : '';
    const collectionDate = data.collectionDate ? data.collectionDate.toString() : '';
    const amount = data.amount ? data.amount.toString() : '';

    // Filter based on selected filter type and search term
    if (filterBy === 'name') {
      return name.includes(searchTerm.toLowerCase());
    } else if (filterBy === 'email') {
      return email.includes(searchTerm.toLowerCase());
    } else if (filterBy === 'collectionDate') {
      return collectionDate.includes(searchTerm);
    } else if (filterBy === 'amount') {
      return amount.includes(searchTerm);
    }
    return false; // Default case
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const exportToExcel = () => {
    const dataToExport = formCollection.map(({ _id, __v, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Form Data');
    XLSX.writeFile(wb, 'FormData.xlsx');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleImport = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5001/api/import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await axios.get('http://localhost:5001/api/formdata', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormCollection(response.data);
        setFile(null);
      } catch (error) {
        console.error('Error importing form data:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className='form-collection'>
      <div className="import-export-buttons">
        <input
          type='file'
          accept='.xlsx, .xls'
          onChange={handleFileChange}
        />
        <button onClick={handleImport}>Import</button>
        <button onClick={exportToExcel}>Export</button>
      </div>
      <div className="search-container">
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="collectionDate">Collection Date</option>
          <option value="amount">Amount</option>
        </select>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Collection Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((data, index) => {
            const isEditing = formCollection[editIndex]?._id === data._id;
            return (
              <tr key={data._id}>
                <td>
                  {isEditing ? (
                    <input
                      type='text'
                      name='name'
                      value={editData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    data.name
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type='text'
                      name='email'
                      value={editData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    data.email
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type='text'
                      name='collectionDate'
                      value={editData.collectionDate}
                      onChange={handleInputChange}
                    />
                  ) : (
                    data.collectionDate
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type='text'
                      name='amount'
                      value={editData.amount}
                      onChange={handleInputChange}
                    />
                  ) : (
                    data.amount
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <button onClick={handleSaveClick}>Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(index)}>Edit</button>
                      <button onClick={() => handleDeleteClick(index)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>Next</button>
      </div>
    </div>
  );
};

export default FormCollection;













