import React, { useEffect, useState } from 'react';
import './Community.css';

const Community = ({ year, branch }) => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        if (!year || !branch) return;

        console.log(`In communit:  Extracted from Home - Year: ${year} Branch: ${branch}`);

        fetch(`http://localhost:8081/api/announcements?year=${encodeURIComponent(year)}&branch=${encodeURIComponent(branch)}`)
            .then(res => res.json())
            .then(data => {

                const announcementList = data.announcements || [];

                if (Array.isArray(announcementList)) {
                    const filtered = announcementList.filter(msg => {
                        const isSameYear = !msg.year || msg.year === year;
                        const isSameBranch = !msg.branch || msg.branch === branch;
                        return isSameYear && isSameBranch;
                    });

                    setAnnouncements(filtered);
                } else {
                    console.error("Announcements is not an array:", announcementList);
                }
            })
            .catch(err => console.error('Error fetching announcements:', err));
    }, [year, branch]);

    return (
        <div className="chat-container">
            <h2 className="chat-header">Class Updates</h2>
            <div className="chat-box">
                {announcements.length > 0 ? (
                    announcements.map((msg, index) => (
                        <div className="chat-message" key={index}>
                            <div className="message-content">
                                <strong>{msg.title}</strong>
                                <p>{msg.description}</p>
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
