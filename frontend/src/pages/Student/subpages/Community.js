import React, { useEffect, useState } from 'react';
import './Community.css';

const Community = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Dummy fetch - replace with your actual backend endpoint
        fetch('http://localhost:8081/api/community-messages')
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error('Error fetching messages:', err));
    }, []);

    return (
        <div className="chat-container">
            <h2 className="chat-header">📣 Community Updates</h2>
            <div className="chat-box">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div className="chat-message" key={index}>
                            <div className="message-meta">
                                <span className="sender-name">{msg.postedBy}</span>
                                <span className="message-time">
                                    {new Date(msg.date).toLocaleString(undefined, {
                                        weekday: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        day: 'numeric',
                                        month: 'short'
                                    })}
                                </span>
                            </div>
                            <div className="message-content">
                                <strong>{msg.title}</strong>
                                <p>{msg.content}</p>
                                {msg.link && (
                                    <a href={msg.link} target="_blank" rel="noopener noreferrer">
                                        {msg.link}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-messages">No community messages yet.</p>
                )}
            </div>
        </div>
    );
};

export default Community;
