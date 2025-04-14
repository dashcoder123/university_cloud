import React from 'react';
import './EmploymentRecord.css';
import { FaLink } from 'react-icons/fa'; // FontAwesome link icon

const EmploymentRecord = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className='Recordbar'><strong>Employment Record</strong></h1>
      </div>

      <div className="info-box">
        <div className="record-boxes">
          <a
            href="https://example.com/payroll"
            target="_blank"
            rel="noopener noreferrer"
            className="record-link-box"
          >
            <FaLink className="link-icon" />
            Payroll
          </a>

          <a
            href="https://example.com/confidential"
            target="_blank"
            rel="noopener noreferrer"
            className="record-link-box"
          >
            <FaLink className="link-icon" />
            Confidential
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmploymentRecord;
