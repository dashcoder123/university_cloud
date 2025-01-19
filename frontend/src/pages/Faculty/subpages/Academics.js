import React from 'react'
import './Academics.css'; 
import { FaDownload } from "react-icons/fa";


const Academics = () => {
  return (
    <div className="container">
    <div className="header">
      <h1 className='Eventbar'><strong>Academics</strong></h1>
    </div>
    <div className="academics-container">
        <div className="academics-box">
          <h2>Attendance Record:</h2>
          <p><strong>Total Working Days:</strong> 365/365</p>
          <p><strong>Work Hours:</strong> 8 am to 4 pm</p>
          <p><strong>Work Hours:</strong> 8 am to 4 pm</p>
          <p><strong>Work Hours:</strong> 8 am to 4 pm</p>
          <p><strong>Work Hours:</strong> 8 am to 4 pm</p>
        </div>

        <div className="academics-box" id='middle-view'>
          <div className='downloads'>
          <h2>Teaching Timetable:</h2>
          <button><FaDownload /></button>
          </div>
          <div className='downloads'>
          <h2>Yearly Calendar:</h2>
          <button><FaDownload /></button>
          </div>

        </div>

        <div className="academics-box">
          <h2>Teaching Syllabus:</h2>
          <div className='downloads'>
          <h2>CST:</h2>
          <button><FaDownload /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Academics