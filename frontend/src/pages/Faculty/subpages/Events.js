import React, { useEffect, useState } from 'react';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from the server
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/events'); // Adjust the URL if needed
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data); // Store events in state
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="Eventbar"><strong>Events</strong></h1>
      </div>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length > 0 ? (
        events.map((event, index) => (
          <div key={index} className="info-box">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
          </div>
        ))
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default Events;
