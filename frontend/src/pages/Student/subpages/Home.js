import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; 

const Home = ({ id, role }) => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/students/${id}`);
        setStudentData(response.data);
      } catch (err) {
        setError('Error fetching student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="header">
        {/* Dynamically display the name and role */}
        <h1 className='Namebar'>
          <strong>Welcome, {role === 'Student' ? studentData.name : 'Student'}!</strong>
        </h1>
      </div>

      <div className="details-container">
        <div className="details-box">
          <h2>Academic Details:</h2>
          <p><strong>Course Enrolled:</strong> {studentData.course}</p>
          <p><strong>Year of Admission:</strong> {studentData.yearOfAdmission}</p>
          <p><strong>Year of Graduation:</strong> {studentData.yearOfGraduation}</p>
          <p><strong>Academic Year:</strong> {studentData.academicYear}</p>
          <p><strong>Head of Department:</strong> {studentData.hod}</p>
          <p><strong>Class Advisor:</strong> {studentData.classAdvisor}</p>
          <p><strong>Class Representative:</strong> {studentData.classRep}</p>
          <p><strong>Student Representative:</strong> {studentData.studentRep}</p>  
          <p><strong>Average CGPA:</strong> {studentData.cgpa || 'N/A'}</p>
          <p><strong>Average Percentage:</strong> {studentData.percentage || 'N/A'}</p>
          {/* Add other academic details as necessary */}
        </div>

        <div className="details-box">
          <h2>Personal Details:</h2>
          <p><strong>Father's Name:</strong> {studentData.fathersName}</p>
          <p><strong>Mother's Name:</strong> {studentData.mothersName}</p>
          <p><strong>Phone Number:</strong> {studentData.phoneNumber}</p>
          <p><strong>Alternate Phone Number:</strong> {studentData.alternatePhone}</p>
          <p><strong>Email ID:</strong> {studentData.email}</p>
          <p><strong>Category:</strong> {studentData.category}</p>
          <p><strong>PRN Number:</strong> {studentData.prn}</p>
          <p><strong>ABC ID:</strong> {studentData.abcId}</p>
          <p><strong></strong> </p>
          {/* Add other personal details as necessary */}
        </div>
      </div>
    </div>
  );
};

export default Home;



