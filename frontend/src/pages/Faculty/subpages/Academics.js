import React, { useEffect, useState } from 'react';
import './Academics.css'; 
import { FaDownload } from "react-icons/fa";
import axios from 'axios';

const Academics = ({ id }) => {
  const [teachingInfo, setTeachingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teaching info from the backend based on the faculty id
  useEffect(() => {
    const fetchTeachingInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/teachinginfo/${id}`);
        setTeachingInfo(response.data);
      } catch (err) {
        setError('Error fetching teaching info');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachingInfo();
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
          <h2>Teaching Information:</h2>
          {teachingInfo.teachingInfo && teachingInfo.teachingInfo.map((info, index) => (
            <p key={index}><strong>{info}</strong></p>
          ))}
        </div>

        <div className="academics-box" id='middle-view'>
          <div className='downloads'>
            <h2>Teaching Timetable:</h2>
            {teachingInfo.teachingTT && (
              <a href={teachingInfo.teachingTT} target="_blank" rel="noopener noreferrer">
                <button><FaDownload /></button>
              </a>
            )}
          </div>
          <div className='downloads'>
            <h2>Yearly Calendar:</h2>
                <button><FaDownload /></button>
          </div>
        </div>

        <div className="academics-box">
          <h2>Teaching Syllabus:</h2>
          {teachingInfo.teachingSyllabus && teachingInfo.teachingSyllabus.map((syllabus, index) => (
            <div key={index} className='downloads'>
              <h2>{syllabus.branch}:</h2>
              <a href={syllabus.syll} target="_blank" rel="noopener noreferrer">
                <button><FaDownload /></button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Academics;
