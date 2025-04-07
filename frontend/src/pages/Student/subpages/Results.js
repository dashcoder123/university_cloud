import React from 'react';
import './Results.css'; 

const Results = () => {
  return (
<div className="container">
    <div className="header">
      <h1 className='Eventbar'><strong>Results and Evaluation</strong></h1>
    </div>
    <div className="results-container">
        <div className="results-box">
          <h2>Semester Wise Results:</h2>
          <div className='semester-box'>
          <button>Semester 1</button>
            </div>
            <div className='semester-box'>
            <button>Semester 2</button>
            </div>
            <div className='semester-box'>
            <button>Semester 3</button>
            </div>
            <div className='semester-box'>
            <button>Semester 4</button>
            </div>
            <div className='semester-box'>
            <button>Semester 5</button>
            </div>
            <div className='semester-box'>
            <button>Semester 6</button>
            </div>
            <div className='semester-box'>
            <button>Semester 7</button>
            </div>
            <div className='semester-box'>
            <button>Semester 8</button>
            </div>
        </div>

        <div className="results-box">
          <div className='results-subbox' id='upper-box'>
            <h2>Current Scores:</h2>
            <p><strong>Current Percentage:</strong> 80.81%</p>
            <p><strong>Current CGPA:</strong> 8.94 CGPA</p>
          </div>
          <div className='results-subbox'>
          <h2>Result Updates:</h2>
          <div className='results-notification'>
            <p>Lorem</p>
          </div>
          <div className='results-notification'>
            <p>Lorem</p>
          </div>
          <div className='results-notification'>
            <p>Lorem</p>
          </div>
          <div className='results-notification'>
            <p>Lorem</p>
          </div>
          <div className='results-notification'>
            <p>Lorem</p>
          </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Results