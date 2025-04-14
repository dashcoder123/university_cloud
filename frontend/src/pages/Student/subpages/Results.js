import React, { useState, useEffect } from 'react';
import './Results.css';

const Results = ({ branch, cgpa, percentage }) => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [pdfLink, setPdfLink] = useState('');

  // Debug log to check props
  useEffect(() => {
  }, [branch, cgpa, percentage]);

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedSemester && selectedYear && branch) {
      const fileName = `${branch}_${selectedYear}_Semester${selectedSemester}.pdf`;
      const link = `https://99cf-103-178-105-213.ngrok-free.app/v1/AUTH_test/results/${fileName}`;
      setPdfLink(link);
    } else {
      alert("Please select year and semester.");
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
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
              ))}
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
          <p><strong>Current Percentage:</strong> {percentage || 'N/A'}</p>
          <p><strong>Current CGPA:</strong> {cgpa || 'N/A'} CGPA</p>
        </div>
      </div>
    </div>
  );
};

export default Results;
