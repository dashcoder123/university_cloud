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
import Community from './subpages/Community'; // ✅ Already imported
import { useAuth } from '../../context/AuthContext.js';

const FacultyDashboard = () => {
  const { auth } = useAuth();
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
          <Route path="community" element={<Community id={id} role={role} />} /> {/* ✅ Added this line */}
        </Routes>
      </div>
    </div>
  );
}

export default FacultyDashboard;
