import React from 'react';
import { Route, Routes } from 'react-router-dom';  
import Navbar from './Navbar.js';
import Home from './subpages/Home.js';
import Events from './subpages/Events';
import Notifications from './subpages/Notifications';
import EmploymentRecord from './subpages/EmploymentRecord';
import { useAuth } from '../../context/AuthContext.js';  

const StaffDashboard = () => {
  const { auth } = useAuth();  
  const { id, role } = auth;

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home id={id} role={role} />} />
          <Route path="events" element={<Events id={id} role={role} />} />
          <Route path="notifications" element={<Notifications id={id} role={role} />} />
          <Route path="records" element={<EmploymentRecord id={id} role={role} />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffDashboard;
