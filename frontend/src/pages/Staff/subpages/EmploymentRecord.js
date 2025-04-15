import React, { useState } from 'react';
import './EmploymentRecord.css';

const EmploymentRecord = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const validId = 'Account';
    const validPassword = 'account@123';

    if (id === validId && password === validPassword) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  // Construct dynamic URLs using the entered username
  const budgetUrl = `https://e455-106-66-226-240.ngrok-free.app/v1/AUTH_test/${id}/Budget.pdf`;
  const balanceSheetUrl = `https://e455-106-66-226-240.ngrok-free.app/v1/AUTH_test/${id}/Balancesheet.pdf`;

  return (
    <div className="container">
      <div className="header">
        <h1 className="Recordbar"><strong>Employment Record</strong></h1>
      </div>

      {!isLoggedIn ? (
        <form className="login-card" onSubmit={handleLogin}>
          <h2 className="login-title">Department Login</h2>
          <input
            type="text"
            placeholder="Department Username"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Department Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div className="info-box">
          <p>Welcome to <strong>{id}</strong></p>

          {/* First Div Bar */}
          <div className="record-section">
            <h3>Budget</h3>
            <a href={budgetUrl} target="_blank" rel="noopener noreferrer">
              <button className="access-btn">View</button>
            </a>
          </div>

          {/* Second Div Bar */}
          <div className="record-section">
            <h3>Balancesheet</h3>
            <a href={balanceSheetUrl} target="_blank" rel="noopener noreferrer">
              <button className="access-btn">View</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmploymentRecord;
