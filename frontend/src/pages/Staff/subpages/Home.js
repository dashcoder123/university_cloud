import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { useAuth } from '../../../context/AuthContext';

const Home = () => {
  const { auth } = useAuth();
  const [staffData, setStaffData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = auth;

  useEffect(() => {
    if (!id) {
      setError('Staff ID is not provided');
      setLoading(false);
      return;
    }

    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/staff/${id}`);  // Replace with the correct API endpoint
        setStaffData(response.data);
      } catch (err) {
        setError('Error fetching staff data');
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1 className="Namebar">
          <strong>Welcome, {staffData?.name || 'Staff'}!</strong>
        </h1>
      </div>

      <div className="details-container">
        <div className="details-box">
          <h2>Academic Details:</h2>
          <p><strong>Department:</strong> {staffData?.department || 'N/A'}</p>
          <p><strong>Year of Joining:</strong> {staffData?.yearOfJoining || 'N/A'}</p>
          <p><strong>Highest Education Qualification:</strong> {staffData?.highestEducationQualification || 'N/A'}</p>
          <p><strong>Work Type:</strong> {staffData?.workType || 'N/A'}</p>
          <p><strong>Position:</strong> {staffData?.position || 'N/A'}</p>
          <p><strong>Total Work Years:</strong> {staffData?.totalWorkYears || 'N/A'}</p>
        </div>

        <div className="details-box">
          <h2>Personal Details:</h2>
          <p><strong>Father's Name:</strong> {staffData?.fathersName || 'N/A'}</p>
          <p><strong>Mother's Name:</strong> {staffData?.mothersName || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {staffData?.phoneNumber || 'N/A'}</p>
          <p><strong>Alternate Phone Number:</strong> {staffData?.alternatePhone || 'N/A'}</p>
          <p><strong>Residential Address:</strong> {staffData?.residentialAddress || 'N/A'}</p>
          <p><strong>Email ID:</strong> {staffData?.email || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {staffData?.dateOfBirth ? new Date(staffData?.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Nationality:</strong> {staffData?.nationality || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
