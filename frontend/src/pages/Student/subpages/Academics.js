import React, { useEffect, useState } from 'react';
import './Academics.css';
import { FaDownload } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import axios from 'axios';

const Academics = ({ id, role }) => {
  const [studentData, setStudentData] = useState(null);
  const [classTTLink, setClassTTLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/students/${id}`);
        setStudentData(response.data);

        // fetch class timetable
        const classTTResponse = await axios.get(`http://localhost:8081/api/syllabus/classtt`);
        if (classTTResponse.data && classTTResponse.data.syllabusLink) {
          setClassTTLink(classTTResponse.data.syllabusLink);
        }
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
          
        </div>

        <div className="academics-box" id='middle-view'>
          <div className='downloads'>
            <h2>Class Timetable:</h2>
            {classTTLink ? (
              <a href={classTTLink} target="_blank" rel="noopener noreferrer">
                <button className="syllabus-button">
                <FaLink size={20} />
                </button>
              </a>
            ) : (
              <p>Timetable not available</p>
            )}
          </div>
        </div>

        <div className="academics-box">
          <h2>PYQ and Notes:</h2>
          <p><strong>Cloud Computing</strong> <FiLink /></p>
          <p><strong>Computer Network Security</strong> <FiLink /></p>
          <p><strong>Computational Data Analytics</strong> <FiLink /></p>
          <p><strong>Game Theory</strong> <FiLink /></p>
          <p><strong>TCPE</strong> <FiLink /></p>
        </div>
      </div>
    </div>
  );
};

export default Academics;
