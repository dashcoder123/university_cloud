import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './subpages/Home.js';
import Academics from './subpages/Academics';
import Events from './subpages/Events';
import Notifications from './subpages/Notifications';
import Activity from './subpages/Activity.js';
import FacultyRecord from './subpages/EmploymentRecord.js';
import TeachingMaterial from './subpages/TeachingMaterial.js';
import Community from './subpages/Community';
import { useAuth } from '../../context/AuthContext.js';
import axios from 'axios';

const FacultyDashboard = () => {
  const { auth } = useAuth();
  const { id, role } = auth;

  const [facultyData, setFacultyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/faculty/${id}`);
        setFacultyData(response.data);
      } catch (err) {
        setError('Failed to fetch faculty data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFaculty();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home id={id} role={role} facultyData={facultyData} />} />
          <Route path="academics" element={<Academics id={id} role={role} />} />
          <Route path="events" element={<Events id={id} role={role} />} />
          <Route path="notifications" element={<Notifications id={id} role={role} />} />
          <Route path="material" element={<TeachingMaterial id={id} role={role} />} />
          <Route path="activity" element={<Activity id={id} role={role} />} />
          <Route path="records" element={<FacultyRecord id={id} role={role} />} />
          <Route path="community" element={<Community id={id} role={role} facultyName={facultyData.name} />} />
        </Routes>
      </div>
    </div>
  );
};

export default FacultyDashboard;
