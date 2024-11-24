import React from 'react'
import './Academics.css'; 
import { FaDownload } from "react-icons/fa";
import { FiLink } from "react-icons/fi";


const Academics = () => {
  return (
    <div className="container">
    <div className="header">
      <h1 className='Eventbar'><strong>Academics</strong></h1>
    </div>
    <div className="academics-container">
        <div className="academics-box">
          <h2>Attendance Record:</h2>
          <p><strong>Cloud Computing:</strong> 75%</p>
          <p><strong>Computer Network Security:</strong> 75%</p>
          <p><strong>Computational Data Analytics:</strong> 75%</p>
          <p><strong>Game Theory:</strong> 75%</p>
          <p><strong>TCPE:</strong> 75%</p>
          <p><strong>Cloud Computing Lab:</strong> 75%</p>
          <p><strong>Computer Network Security Lab:</strong> 75%</p>
          <p><strong>Computational Data Analytics Lab:</strong> 75%</p>

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