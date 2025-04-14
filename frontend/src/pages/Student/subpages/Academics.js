import React, { useEffect, useState } from 'react';
import './Academics.css';
import { FaDownload } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import axios from 'axios';

const Academics = ({ id, role }) => {
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
        <h1 className='Eventbar'><strong>Academics</strong></h1>
      </div>
      <div className="academics-container">
        <div className="academics-box">
          <h2>Attendance Record:</h2>
          {/* You can plug in studentData.attendance or similar here */}
        </div>

        <div className="academics-box" id='middle-view'>
          <div className='downloads'>
            <h2>Class Timetable:</h2>
            <button><FaDownload /></button>
          </div>

        </div>

        <div className="academics-box">
          <h2>PYQ and notes:</h2>
          <p><strong>Cloud Computing </strong><FiLink /></p>
          <p><strong>Computer Network Security <FiLink /></strong></p>
          <p><strong>Computational Data Analytics <FiLink /></strong></p>
          <p><strong>Game Theory <FiLink /></strong></p>
          <p><strong>TCPE <FiLink /></strong></p>
        </div>
      </div>
    </div>
  )
}

export default Academics