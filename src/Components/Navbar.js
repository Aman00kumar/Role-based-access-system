import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user && (
          <>
            {user.role === 'supervisor' && (
              <>
                <li><Link to="/supervisordashboard">Supervisor Dashboard</Link></li>
                <li><Link to="/managerdashboard">Manager Dashboard</Link></li>
                <li><Link to="/employeedashboard">Employee Dashboard</Link></li>
                <li><Link to="/formcollection">Form Collection</Link></li>
                <li><Link to="/reports">Reports</Link></li>
              </>
            )}
            {user.role === 'superadmin' && (
              <>
                <li><Link to="/superadmindashboard">Super Admin Dashboard</Link></li>
                <li><Link to="/managerdashboard">Manager Dashboard</Link></li>
                <li><Link to="/employeedashboard">Employee Dashboard</Link></li>
                <li><Link to="/supervisordashboard">Supervisor Dashboard</Link></li>
                <li><Link to="/reports">Reports</Link></li>
              </>
            )}
            {user.role === 'manager' && (
              <>
                <li><Link to="/managerdashboard">Manager Dashboard</Link></li>
                <li><Link to="/employeedashboard">Employee Dashboard</Link></li>
              </>
            )}
            {user.role === 'employee' && (
              <>
                <li><Link to="/formcollection">Form Collection</Link></li>
                <li><Link to="/employeedashboard">Employee Dashboard</Link></li>
              </>
            )}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;













