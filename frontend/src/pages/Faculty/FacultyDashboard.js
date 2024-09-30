import React from 'react';
import { Route, Routes } from 'react-router-dom';  
import Navbar from './Navbar.js';
import Home from './subpages/Home.js';
import Academics from './subpages/Academics';  
import Events from './subpages/Events';
import Notifications from './subpages/Notifications';
import Payment from './subpages/Payment';
import Results from './subpages/Results';

const FacultyDashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="academics" element={<Academics />} />
          <Route path="events" element={<Events />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="payment" element={<Payment />} />
          <Route path="results" element={<Results />} />
        </Routes>
      </div>
    </div>
  );
}

export default FacultyDashboard