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
import { useAuth } from '../../context/AuthContext.js';  // Import useAuth hook

const FacultyDashboard = () => {
  const { auth } = useAuth();  // Get the id and role from AuthContext
  const { id, role } = auth;

  console.log("ID in FacultyDashboard:", id);
  console.log("Role in FacultyDashboard:", role);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home id={id} role={role} />} />
          <Route path="academics" element={<Academics id={id} role={role} />} />
          <Route path="events" element={<Events id={id} role={role} />} />
          <Route path="notifications" element={<Notifications id={id} role={role} />} />
          <Route path="material" element={<TeachingMaterial id={id} role={role} />} />
          <Route path="activity" element={<Activity id={id} role={role} />} />
          <Route path="records" element={<FacultyRecord id={id} role={role} />} />
        </Routes>
      </div>
    </div>
  );
}

export default FacultyDashboard;
