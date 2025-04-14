import React, { useEffect, useState } from 'react';
import './Activity.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const Activity = () => {
  const { auth } = useAuth();
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedActivities, setExpandedActivities] = useState({});

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

  const toggleActivity = (roleIndex, activityIndex) => {
    const key = `${roleIndex}-${activityIndex}`;
    setExpandedActivities((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1 className="Activitybar"><strong>Faculty Activities</strong></h1>
      </div>

      {activityData && activityData.roles && (
        <div className="roles-container">
          {activityData.roles.map((role, roleIndex) => (
            <div key={roleIndex} className="info-box">
              <h1 className="infotitle">{role.roleName}</h1>
              <div className="info-container">
                {role.activities.map((activity, activityIndex) => {
                  const key = `${roleIndex}-${activityIndex}`;
                  return (
                    <div
                      className="collapsible-item"
                      key={activityIndex}
                      onClick={() => toggleActivity(roleIndex, activityIndex)}
                    >
                      <span className="activity-title">{activity.name}</span>
                      {expandedActivities[key] && (
                        <div className="activity-details">
                          <p><strong>Description:</strong> {activity.description || "No details available."}</p>
                          <p><strong>Link:</strong> <a href={activity.url} target="_blank" rel="noopener noreferrer">{activity.url}</a></p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;
