import React, { useState } from 'react';
import './EmploymentRecord.css';
import { keystoneLogin } from './keystoneauth.js'; // ⬅️ Import login logic

const EmploymentRecord = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [response, setResponse] = useState(null); // optional: holds extra Keystone user info

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔵 Log the inputs received before sending to Keystone
    console.log('🔵 Submitting login form with:');
    console.log('Username (ID):', id);
    console.log('Password: ', password);
    console.log('Passed to keystonauth.js for api');

    try {
      const { token, userData } = await keystoneLogin(id, password);

      // Log successful response
      console.log('Received token from Keystone:', token);
      console.log('Received user data:', userData);

      setToken(token);
      setResponse(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('🔴 Keystone login error:', error);
      alert('Login failed: ' + error.message);
    }
  };

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
          <h2>Login successful!</h2>
          <p>Welcome, user with Keystone username: <strong>{id}</strong></p>
          <p><strong>Token:</strong> {token}</p>
          {/* Optional: Show Keystone user details */}
          {response && (
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(response, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default EmploymentRecord;
