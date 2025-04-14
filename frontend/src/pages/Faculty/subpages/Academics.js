import React, { useEffect, useState } from 'react';
import './Academics.css';
import { FaLink } from "react-icons/fa";
import axios from 'axios';

const Academics = ({ id }) => {
  const [teachingInfo, setTeachingInfo] = useState(null);
  const [syllabusData, setSyllabusData] = useState([]);
  const [facultyTTLink, setFacultyTTLink] = useState(null);
  const [classTTLink, setClassTTLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachingInfo = async () => {
      try {
        const teachingResponse = await axios.get(`http://localhost:8081/api/teachinginfo/${id}`);
        setTeachingInfo(teachingResponse.data);

        // Fetch timetable links
        const facultyResponse = await axios.get(`http://localhost:8081/api/syllabus/facultytt`);
        if (facultyResponse.data && facultyResponse.data.syllabusLink) {
          setFacultyTTLink(facultyResponse.data.syllabusLink);
        }

        const classResponse = await axios.get(`http://localhost:8081/api/syllabus/classtt`);
        if (classResponse.data && classResponse.data.syllabusLink) {
          setClassTTLink(classResponse.data.syllabusLink);
        }

        const syllabusList = [];
        if (teachingResponse.data.teachingSyllabus) {
          for (const syllabus of teachingResponse.data.teachingSyllabus) {
            const syllabusResponse = await axios.get(`http://localhost:8081/api/syllabus/${syllabus}`);
            if (syllabusResponse.data && syllabusResponse.data.syllabusLink) {
              syllabusList.push({
                name: syllabus,
                link: syllabusResponse.data.syllabusLink,
              });
            }
          }
        }

        setSyllabusData(syllabusList);

      } catch (err) {
        console.error(err);
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
          {teachingInfo?.teachingInfo?.map((info, index) => (
            <p key={index}><strong>{info}</strong></p>
          ))}
        </div>

        <div className="academics-box" id='middle-view'>
          <div className='downloads'>
            <h2>Teaching Timetable:</h2>
            {facultyTTLink && (
              <a href={facultyTTLink} target="_blank" rel="noopener noreferrer">
                <button className="syllabus-button">
                  <FaLink size={20} />
                </button>
              </a>
            )}
          </div>
          <div className='downloads'>
            <h2>Class Timetable:</h2>
            {classTTLink && (
              <a href={classTTLink} target="_blank" rel="noopener noreferrer">
                <button className="syllabus-button">
                  <FaLink size={20} />
                </button>
              </a>
            )}
          </div>
        </div>

        <div className="academics-box">
          <h2>Teaching Syllabus:</h2>
          {syllabusData.length > 0 ? (
            syllabusData.map((syllabus, index) => (
              <div key={index} className='downloads'>
                <h3>{syllabus.name}</h3>
                <a href={syllabus.link} target="_blank" rel="noopener noreferrer">
                  <button className="syllabus-button">
                    <FaLink size={20} />
                  </button>
                </a>
              </div>
            ))
          ) : (
            <p>No syllabus available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Academics;
