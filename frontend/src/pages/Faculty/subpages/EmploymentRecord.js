import React from 'react'
import './EmploymentRecord.css'

const EmploymentRecord = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className='Recordbar'><strong>Employment Record</strong></h1>
      </div>

      <div className="info-box">
        {/* You can add form fields here if needed */}
        <button className="submit-btn" type="submit">Submit</button>
      </div>
    </div>
  )
}

export default EmploymentRecord
