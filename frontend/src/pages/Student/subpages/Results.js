import React, { useState } from 'react';
import './Results.css';

const Results = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [pdfLink, setPdfLink] = useState('');

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedSemester && selectedYear) {
      const link = `https://99cf-103-178-105-213.ngrok-free.app/v1/AUTH_test/receipts/0012021.pdf`;
      setPdfLink(link);
    } else {
      alert("Please select both semester and year.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className='Eventbar'><strong>Results and Evaluation</strong></h1>
      </div>

      <div className="center-wrapper">
        <div className="results-box">
          <h2>Semester Wise Results:</h2>
          <div className="dropdown-row">
            <select className='dropdown' value={selectedYear} onChange={handleYearChange}>
              <option value="">Select Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <select className='dropdown' value={selectedSemester} onChange={handleSemesterChange}>
              <option value="">Select Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {pdfLink && (
            <div className="pdf-link">
              <a href={pdfLink} target="_blank" rel="noopener noreferrer">
                View Result PDF
              </a>
            </div>
          )}
        </div>

        <div className="results-box">
          <h2>Current Scores:</h2>
          <p><strong>Current Percentage:</strong> 80.81%</p>
          <p><strong>Current CGPA:</strong> 8.94 CGPA</p>
        </div>

        <div className="results-box">
          <h2>Result Updates:</h2>
          <div className='results-notification'><p>Lorem</p></div>
          <div className='results-notification'><p>Lorem</p></div>
          <div className='results-notification'><p>Lorem</p></div>
          <div className='results-notification'><p>Lorem</p></div>
          <div className='results-notification'><p>Lorem</p></div>
        </div>
      </div>
    </div>
  );
}

export default Results;
