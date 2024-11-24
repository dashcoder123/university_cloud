import React from 'react';
import { Route, Routes } from 'react-router-dom';  
import Navbar from './Navbar.js';
import Home from './subpages/Home.js';
import Academics from './subpages/Academics';  
import Events from './subpages/Events';
import Notifications from './subpages/Notifications';
import Activity from './subpages/Activity.js';
import FacultyRecord from './subpages/EmploymentRecord.js';
import TeachingMaterial from './subpages/TeachingMaterial.js';

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
          <Route path="material" element={<TeachingMaterial />} />
          <Route path="activity" element={<Activity />} />
          <Route path="records" element={<FacultyRecord />} />
        </Routes>
      </div>
    </div>
  );
}

export default FacultyDashboard