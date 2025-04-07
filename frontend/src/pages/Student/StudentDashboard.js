import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './subpages/Home.js';
import Academics from './subpages/Academics';
import Events from './subpages/Events';
import Notifications from './subpages/Notifications';
import Payment from './subpages/Payment';
import Results from './subpages/Results';
import { useAuth } from '../../context/AuthContext.js';  // Import useAuth hook
import Chatbot from './Chatbot'; // ✅ Importing Chatbot component

const StudentDashboard = () => {
  const { auth } = useAuth();  // Get the id and role from AuthContext
  const { id, role } = auth;

  console.log("ID in StudentDashboard:", id);
  console.log("Role in StudentDashboard:", role);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home id={id} role={role} />} />
          <Route path="academics" element={<Academics id={id} role={role} />} />
          <Route path="events" element={<Events id={id} role={role} />} />
          <Route path="notifications" element={<Notifications id={id} role={role} />} />
          <Route path="payment" element={<Payment id={id} role={role} />} />
          <Route path="results" element={<Results id={id} role={role} />} />
        </Routes>
      </div>

      <Chatbot /> {/* ✅ Added Chatbot here */}
    </div>
  );
};

export default StudentDashboard;
