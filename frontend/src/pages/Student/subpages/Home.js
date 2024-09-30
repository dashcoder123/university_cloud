import React from 'react';
import './Home.css'; 
import studentimg from '../../../assets/Sheetal.jpg';

const Home = () => {
  return (
    <div className="container">
      <div className="header">
        <img 
          src= {studentimg} 
          alt="profile" 
          className="profile-img" 
        />
        <h1 className='Namebar'><strong>Welcome, Sheetal Dash!</strong></h1>
      </div>

      <div className="details-container">
        <div className="details-box">
          <h2>Academic Details:</h2>
          <p><strong>Course Enrolled:</strong> Computer Science and Technology</p>
          <p><strong>Year of Admission:</strong> 2021</p>
          <p><strong>Year of Graduation:</strong> 2025</p>
          <p><strong>Academic Year:</strong> Fourth Year</p>
          <p><strong>Head of Department:</strong> Prof. Kumud Wasnik</p>
          <p><strong>Class Advisor:</strong> Prof. Sumedh Pundkar</p>
          <p><strong>Class Representative:</strong> Avantika Mane</p>
          <p><strong>Student Representative:</strong> Ruchi Bhati</p>
          <p><strong>Average CGPA:</strong> 8.936</p>
          <p><strong>Average Percentage:</strong> 80.08%</p>
        </div>

        <div className="details-box">
          <h2>Personal Details:</h2>
          <p><strong>Father's Name:</strong> Soubhagya Kumar Dash</p>
          <p><strong>Mother's Name:</strong> Jyotirmayee Dash</p>
          <p><strong>Phone Number:</strong> 9136371156</p>
          <p><strong>Alternate Phone Number:</strong> 9136371156</p>
          <p><strong>Email ID:</strong> sheetaldash52@gmail.com</p>
          <p><strong>Category:</strong> General</p>
          <p><strong>PRN Number:</strong> 2021016100164133</p>
          <p><strong>ABC ID:</strong> 120-330-393-051</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
