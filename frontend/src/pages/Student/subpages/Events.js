import React, { useEffect, useState } from 'react';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from the server
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="Eventbar"><strong>Events</strong></h1>
      </div>

      {/* Embedded Google Calendar */}
      <div className="calendar-container">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=f72309a47948e3379ca6391b5fcd32cb54bdfb8ca743a1fad30151591db17fb0@group.calendar.google.com&ctz=Asia/Kolkata"
          style={{ border: 0 }}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="Student Calendar"
        ></iframe>
      </div>

      {/* Events list */}
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
