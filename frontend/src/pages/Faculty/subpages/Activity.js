import React from 'react'
import './Activity.css'
import { FiLink } from "react-icons/fi";


const Activity = () => {
  return (
    <div className="container">
    <div className="header">
      <h1 className='Activitybar'><strong>Faculty Activities</strong></h1>
    </div>
    <div className="info-box">
      <h1 className='infotitle'>Head of Department (Computer Science and Technology)</h1>
      <div className='info-container'>
      <div className='infos-box'>Faculty List <button><FiLink /></button></div> 
      <div className='infos-box'>Faculty Attendance <button><FiLink /></button></div>
      <div className='infos-box'>Student Enrolled <button><FiLink /></button></div>
      <div className='infos-box'>CR/SR List <button><FiLink /></button></div>
      <div className='infos-box'>Student Report <button><FiLink /></button></div>
      <div className='infos-box'>Syllabus Status <button><FiLink /></button></div>
      </div>
      </div>
    </div>
  )
}

export default Activity