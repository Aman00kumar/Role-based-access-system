import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './Context/AuthContext'; // Ensure this path is correct
import { FormCollectionProvider } from './Context/Formcollectioncontext'; // Ensure this path is correct

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <FormCollectionProvider>
          <App />
        </FormCollectionProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

















