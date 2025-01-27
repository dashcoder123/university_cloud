import React, { useEffect, useState } from 'react';
import './Activity.css';
import axios from 'axios';
import { FiLink } from "react-icons/fi";
import { useAuth } from '../../../context/AuthContext'; 

const Activity = () => {
  const { auth } = useAuth(); 
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = auth; 

  useEffect(() => {
    if (!id) {
      setError('ID is not provided');
      setLoading(false);
      return;
    }

    const fetchActivityData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/activities/${id}`);
        setActivityData(response.data);
      } catch (err) {
        setError('Error fetching activity data');
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1 className="Activitybar"><strong>Faculty Activities</strong></h1>
      </div>
      
      {activityData && activityData.roles && (
        <div className="roles-container">
          {activityData.roles.map((role, index) => (
            <div key={index} className="info-box">
              <h1 className="infotitle">{role.roleName}</h1>
              <div className="info-container">
                {role.activities.map((activity, idx) => (
                  <div className="infos-box" key={idx}>
                    {activity.name}
                    <a href={activity.url} target="_blank" rel="noopener noreferrer">
                      <button><FiLink /></button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;
