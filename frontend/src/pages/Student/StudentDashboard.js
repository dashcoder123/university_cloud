import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
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
import TalkUMIT from './subpages/TalkUMIT.js';

const StudentDashboard = () => {
  const { auth } = useAuth();
  const { id, role } = auth;

  const [yearBranch, setYearBranch] = useState({ year: '', branch: '' });
  const [cgpa, setCgpa] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [studentData, setStudentData] = useState(null); // State to hold student data

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/students/${id}`);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleYearBranchExtracted = ({ year, branch }) => {
    setYearBranch({ year, branch });
  };

  const handleStudentDataFetched = ({ cgpa, percentage }) => {
    setCgpa(cgpa);
    setPercentage(percentage);
  };

  if (!studentData) {
    return <div>Loading student data...</div>; // Show a loading message while student data is being fetched
  }

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/' element={
            <Home
              id={id}
              role={role}
              onYearBranchExtracted={handleYearBranchExtracted}
              onStudentDataFetched={handleStudentDataFetched}
            />
          } />
          <Route path="academics" element={<Academics id={id} year={yearBranch.year} branch={yearBranch.branch} />} />
          <Route path="events" element={<Events id={id} role={role} />} />
          <Route path="notifications" element={<Notifications id={id} role={role} />} />
          <Route path="payment" element={<Payment id={id} role={role} />} />
          <Route path="results" element={
            <Results
              id={id}
              role={role}
              branch={yearBranch.branch}
              cgpa={cgpa}
              percentage={percentage}
            />
          } />
          <Route path="ticket" element={<TicketCategories id={id} role={role} />} />
          <Route path="community" element={
            <Community
              year={yearBranch.year}
              branch={yearBranch.branch}
            />
          } />
          <Route path="talk" element={
            <TalkUMIT
              year={yearBranch.year}
              branch={yearBranch.branch}
              studentName={studentData.name}  // Pass the student name to TalkUMIT
            />
          } />
        </Routes>
      </div>
      <Chatbot />
    </div>
  );
};

export default StudentDashboard;
