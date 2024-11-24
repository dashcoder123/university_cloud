import React from 'react';
import { Route, Routes } from 'react-router-dom';  
import Navbar from './Navbar.js';
import Home from './subpages/Home.js';
import Events from './subpages/Events';
import Notifications from './subpages/Notifications';
import EmploymentRecord from './subpages/EmploymentRecord';

const StaffDashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="records" element={<EmploymentRecord />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffDashboard;
