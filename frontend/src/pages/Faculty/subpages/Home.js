import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { useAuth } from '../../../context/AuthContext';  // Correct import path for useAuth hook

const Home = () => {
  const { auth } = useAuth();  // Get auth data from context
  const [facultyData, setFacultyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id, role } = auth;  // Destructure id and role from auth

  useEffect(() => {
    if (!id) {
      setError('Faculty ID is not provided');
      setLoading(false);
      return;
    }

    const fetchFacultyData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/faculty/${id}`);
        setFacultyData(response.data);
      } catch (err) {
        setError('Error fetching faculty data');
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1 className='Namebar'>
          <strong>Welcome, {role === 'Faculty' ? facultyData.name : 'Faculty'}!</strong>
        </h1>
      </div>

      <div className="details-container">
        <div className="details-box">
          <h2>Academic Details:</h2>
          <p><strong>Year of Joining:</strong> {facultyData.yearOfJoining}</p>
          <p><strong>Highest Education Qualification:</strong> {facultyData.highestEducationQualification}</p>
          <p><strong>Department:</strong> {facultyData.department}</p>
          <p><strong>Specialization Areas:</strong> {facultyData.specializationAreas?.join(', ')}</p>
          <p><strong>Teaching Experience:</strong> {facultyData.teachingExperience} years</p>
          <p><strong>Work Type:</strong> {facultyData.workType}</p>
          <p><strong>Position:</strong> {facultyData.position}</p>
          <p><strong>Total Work Years:</strong> {facultyData.totalWorkYears}</p>
          <p><strong>Employee ID:</strong> {facultyData.id}</p>
        </div>

        <div className="details-box">
          <h2>Personal Details:</h2>
          <p><strong>Father's Name:</strong> {facultyData.fathersName}</p>
          <p><strong>Mother's Name:</strong> {facultyData.mothersName}</p>
          <p><strong>Spouse's Name:</strong> {facultyData.spousesName || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {facultyData.phoneNumber}</p>
          <p><strong>Alternate Phone Number:</strong> {facultyData.alternatePhone}</p>
          <p><strong>Residential Address:</strong> {facultyData.residentialAddress}</p>
          <p><strong>Email ID:</strong> {facultyData.email}</p>
          <p><strong>Date of Birth:</strong> {new Date(facultyData.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Nationality:</strong> {facultyData.nationality}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
