import React from 'react';
import './Home.css'; 
import facultyimg from '../../../assets/KumudMaam.png';

const Home = () => {
  return (
    <div className="container">
      <div className="header">
        <img 
          src= {facultyimg} 
          alt="profile" 
          className="profile-img" 
        />
        <h1 className='Namebar'><strong>Welcome, Kumud Wasnik!</strong></h1>
      </div>

      <div className="details-container">
        <div className="details-box">
          <h2>Academic Details:</h2>
          <p><strong>Year of Joining:</strong> </p>
          <p><strong>Highest Education Qualification:</strong> </p>
          <p><strong>Departments:</strong> Computer Science and Technology</p>
          <p><strong>Specialization Areas:</strong> Clouding computing,Advanced Databases,Data mining and Data Warehouse</p>
          <p><strong>Teaching Experience:</strong> 31 years</p>
          <p><strong>Work Type:</strong> Full time</p>
          <p><strong>Position:</strong> Head of Department (CST)</p>
          <p><strong>Total work year:</strong> </p>
          <p><strong>Employee ID:</strong> ABC-DEF-GHI</p>
          
        </div>

        <div className="details-box">
          <h2>Personal Details:</h2>
          <p><strong>Father's Name:</strong> </p>
          <p><strong>Mother's Name:</strong> </p>
          <p><strong>Spouse's Name:</strong> </p>
          <p><strong>Phone Number:</strong> </p>
          <p><strong>Alternate Phone Number:</strong> </p>
          <p><strong>Residential Address:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p><strong>Email ID:</strong> kumud.wasnik@umit.sndt.ac.in</p>
          <p><strong>Date of Birth:</strong> </p>
          <p><strong>Nationality:</strong> Indian</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
