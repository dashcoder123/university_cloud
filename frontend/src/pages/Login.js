import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import umitheader from '../assets/umitheader.png';
import umitimg from '../assets/umit.png';


const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#f4f4f4',
    color: '#333'
  },
  customHeight: {
    height: '100%'
  },
  logo: {
    width: '80%',
    marginRight: '20px'
  },
  imageDiv: {
    height: '100%',
    background: `url(${umitimg}) no-repeat center center`,
    backgroundSize: 'cover'
  },
  radioGroup: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between'
  },
  radioItem: {
    marginRight: '1rem'
  },
  formLabel: {
    color: '#333',
  },
  formInput: {
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#295F98',
    borderColor: '#295F98',
    color: '#f4f4f4',
  },
};

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { setAuthData } = useAuth();  
  const navigate = useNavigate();  

  const handleRadioChange = (event) => {
    setRole(event.target.id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!id || !password || !role) {
      alert("Please fill out all fields!");
      return;
    }

    const userData = { id, password, role };

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Set id and role in AuthContext (globalling)
        setAuthData(id, role);

        // Navigate to the respective dashboard based on the role
        if (role === 'Student') {
          navigate('/student/dashboard');
        } else if (role === 'Faculty') {
          navigate('/faculty/dashboard');
        } else if (role === 'Staff') {
          navigate('/staff/dashboard');
        } 
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container-fluid" style={styles.container}>
      <div className="row h-100">
        <div className="col-sm-6 d-flex justify-content-center align-items-center" style={styles.customHeight}>
          <div className="w-75">
            <div className="d-flex flex-row mb-5 justify-content-center">
              <img src={umitheader} alt="Logo" className="me-3" style={styles.logo} />
            </div>

            {/* Form starts here */}
            <form onSubmit={handleSubmit}>
              {/* Radio buttons */}
              <div className="mb-4" style={styles.radioGroup}>
                {['Student', 'Faculty', 'Staff'].map((option) => (
                  <div className="form-check" style={styles.radioItem} key={option}>
                    <input className="form-check-input" type="radio" name="option" id={option} onChange={handleRadioChange} />
                    <label className="form-check-label" htmlFor={option}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>

              {/* ID input */}
              <div className="mb-4">
                <label htmlFor="id" className="form-label">
                  {role === 'Student' ? 'Enter your PRN number' : 'Enter your Employee ID'}
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="id"
                  placeholder={role === 'Student' ? 'PRN Number' : 'Employee ID'}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>

              {/* Password input */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              {/* Login button */}
              <button className="btn btn-info w-100 mb-4" style={styles.loginButton} type="submit">Login</button>

              {errorMessage && (
                <div className="alert alert-danger text-center" role="alert">
                  {errorMessage}
                </div>
              )}

            </form>
            {/* Form ends here */}
          </div>
        </div>

        <div className="col-sm-6 d-none d-sm-block px-0">
          <div style={styles.imageDiv} />
        </div>
      </div>
    </div>
  );
}

export default Login;
