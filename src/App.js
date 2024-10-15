import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import ProtectedRoute from './Protectedroute';
import { AuthProvider } from './Context/AuthContext';

import Navbar from './Components/Navbar';
import Login from './Components/Login';
import ManagerDashboard from './Components/Managerdashboard';
import EmployeeDashboard from './Components/Employeedashboard';
import SupervisorDashboard from './Components/supervisordashboard';
import SuperAdminDashboard from './Components/Superadmindashboard';
import FormCollection from './Components/Formcollection';
import Reports from './Components/Reports';
import Home from './Components/Home';
import ManageForms from './Components/Manageforms'; 
import HelpAndSupport from './Components/HelpAndSupport';
import ReportsHome from './Components/Reportshome';
import ResourceCenter from './Components/ResourceCenter';
import GettingStarted from './Components/GettingStarted';
import AdvancedTips from './Components/AdvancedTips';
import Troubleshooting from './Components/Troubleshooting';
import FAQs from './Components/FAQs';
import Dashboard from './Components/dashboard';
import UserManagement from './Components/UserManagement';
import AddUser from './Components/AddUser';
import RolesPermissions from './Components/RolesPermissions';
import SystemConfiguration from './Components/Systemconfiguration'; 



const AppContent = () => {
  const { user } = useAuth();

  if (user === undefined) {
    return <div>Loading...</div>; // Display a loading message while checking user state
  }

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="managerdashboard" element={<ManagerDashboard />} />
          <Route path="employeedashboard" element={<EmployeeDashboard />} />
          <Route path="supervisordashboard" element={<SupervisorDashboard />} />
          <Route path="superadmindashboard" element={<SuperAdminDashboard />} />
          <Route path="formcollection" element={<FormCollection />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reportshome" element={<ReportsHome />} />
          <Route path="manageforms" element={<ManageForms />} />
          <Route path="help" element={<HelpAndSupport />} />
          <Route path="resources" element={<ResourceCenter />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/rolespermissions" element={<RolesPermissions />} />
        

          
          {/* New Routes for Super Admin functionalities */}
          <Route path="resources/getting-started" element={<GettingStarted />} />
          <Route path="resources/advanced-tips" element={<AdvancedTips />} />
          <Route path="resources/troubleshooting" element={<Troubleshooting />} />
          <Route path="resources/faqs" element={<FAQs />} />
          <Route path="/systemsettings" element={<SystemConfiguration />} />
          
        </Route>
        <Route path="*" element={<Navigate to="/" />} /> {/* Fallback route */}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;










