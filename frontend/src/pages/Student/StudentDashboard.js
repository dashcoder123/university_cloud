import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './subpages/Home.js';
import Academics from './subpages/Academics';
import Events from './subpages/Events';
import Notifications from './subpages/Notifications';
import Payment from './subpages/Payment';
import Results from './subpages/Results';
import TicketCategories from './subpages/Ticket.js';
import { useAuth } from '../../context/AuthContext.js';
import Chatbot from './Chatbot';
import Community from './subpages/Community';

const StudentDashboard = () => {
  const { auth } = useAuth();
  const { id, role } = auth;

  const [yearBranch, setYearBranch] = useState({ year: '', branch: '' });

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/' element={
            <Home
              id={id}
              role={role}
              onYearBranchExtracted={setYearBranch}
            />
          } />
          <Route path="academics" element={<Academics id={id} role={role} />} />
          <Route path="events" element={<Events id={id} role={role} />} />
          <Route path="notifications" element={<Notifications id={id} role={role} />} />
          <Route path="payment" element={<Payment id={id} role={role} />} />
          <Route path="results" element={<Results id={id} role={role} />} />
          <Route path="ticket" element={<TicketCategories id={id} role={role} />} />
          <Route path="community" element={
            <Community
              year={yearBranch.year}
              branch={yearBranch.branch}
            />
          } />
        </Routes>
      </div>

      <Chatbot />
    </div>
  );
};

export default StudentDashboard;
