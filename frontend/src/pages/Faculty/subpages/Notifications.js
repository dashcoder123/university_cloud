import React, { useEffect, useState } from 'react';
import './Events.css';
import { FiLink } from "react-icons/fi";


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    fetch('http://localhost:8081/api/notifications')
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data); // Set the fetched data into state
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="Eventbar">
          <strong>Notifications</strong>
        </h1>
      </div>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="info-box">
            <a
              href={notification.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#000' }}
              onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            >
              {notification.text} <FiLink />
            </a>
          </div>
        ))
      ) : (
        <div className="info-box">No notifications available</div>
      )}
    </div>
  );
};

export default Notifications;
