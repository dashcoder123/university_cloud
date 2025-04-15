import React, { useEffect, useState } from 'react';
import './Academics.css';
import { FaLink } from "react-icons/fa";
import { FiLink } from "react-icons/fi";

const Academics = ({ year, branch }) => {
  const [attendanceLink, setAttendanceLink] = useState(null);
  const [classTTLink, setClassTTLink] = useState(null);

  useEffect(() => {
    if (!year || !branch) return;

    console.log(`In Academics: Year = ${year}, Branch = ${branch}`);

    // Fetch Attendance Records
    fetch(`http://localhost:8081/api/attendances?year=${encodeURIComponent(year)}&branch=${encodeURIComponent(branch)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.attendanceRecords.length > 0) {
          // Set the first available attendance record link (or handle differently as needed)
          setAttendanceLink(data.attendanceRecords[0].attendance);
        } else {
          setAttendanceLink(null);
        }
      })
      .catch(err => {
        console.error('Error fetching attendance:', err);
        setAttendanceLink(null);
      });

    // Fetch Timetable (This part stays the same)
    fetch(`http://localhost:8081/api/syllabus/classtt`)
      .then(res => res.json())
      .then(data => {
        if (data && data.syllabusLink) {
          setClassTTLink(data.syllabusLink);
        } else {
          setClassTTLink(null);
        }
      })
      .catch(err => {
        console.error('Error fetching timetable:', err);
        setClassTTLink(null);
      });
  }, [year, branch]);

  return (
    <div className="container">
      <div className="header">
        <h1 className='Eventbar'><strong>Academics</strong></h1>
      </div>

      <div className="academics-container">
        {/* Attendance Section */}
        <div className="academics-box">
          <h2>Attendance Record:</h2>
          {attendanceLink ? (
            <a href={attendanceLink} target="_blank" rel="noopener noreferrer">
              <button className="syllabus-button">
                <FaLink size={20} />
              </button>
            </a>
          ) : (
            <p>Attendance not available</p>
          )}
        </div>

        {/* Class Timetable */}
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

        {/* Notes and PYQs */}
        <div className="academics-box">
          <h2>PYQ and Notes:</h2>
          <p><strong><a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Cloud Computing</a></strong> <FiLink /></p>
          <p><strong><a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Computer Network Security</a></strong> <FiLink /></p>
          <p><strong><a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Computational Data Analytics</a></strong> <FiLink /></p>
          <p><strong><a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Game Theory</a></strong> <FiLink /></p>
          <p><strong><a href="https://www.google.com" target="_blank" rel="noopener noreferrer">TCPE</a></strong> <FiLink /></p>
        </div>
      </div>
    </div>
  );
};

export default Academics;
