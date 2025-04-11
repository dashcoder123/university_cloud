import React from 'react';
import './Home.css';

const Home = ({ facultyData, role }) => {
  if (!facultyData) return <div>Loading...</div>; // Fallback just in case

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
