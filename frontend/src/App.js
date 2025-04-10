import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import StudentDashboard from './pages/Student/StudentDashboard';
import FacultyDashboard from './pages/Faculty/FacultyDashboard';
import StaffDashboard from './pages/Staff/StaffDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login route */}
          <Route path="/" element={<Login />} />

          {/* Dashboard routes */}
          <Route path="/student/dashboard/*" element={<StudentDashboard />} />
          <Route path="/faculty/dashboard/*" element={<FacultyDashboard />} />
          <Route path="/staff/dashboard/*" element={<StaffDashboard />} />

          {/* Default route for invalid paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;




