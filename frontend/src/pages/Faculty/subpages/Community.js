import React, { useState, useEffect } from 'react';
import './Community.css';

const FacultyCommunity = ({ facultyName, position }) => {
    const [classTitle, setClassTitle] = useState('');
    const [classDescription, setClassDescription] = useState('');
    const [classSelectedYear, setClassSelectedYear] = useState('');
    const [classSelectedBranch, setClassSelectedBranch] = useState('');
    const [facultyTitle, setFacultyTitle] = useState('');
    const [facultyDescription, setFacultyDescription] = useState('');
    const [classStatus, setClassStatus] = useState('');
    const [facultyStatus, setFacultyStatus] = useState('');
    const [facultyAnnouncements, setFacultyAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/faculty-announcements');
                const data = await response.json();

                if (data.success) {
                    setFacultyAnnouncements(data.announcements);
                } else {
                    console.error('Failed to fetch announcements');
                }
            } catch (error) {
                console.error('Error fetching faculty announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    const handleClassSubmit = async (e) => {
        e.preventDefault();
        setClassStatus('Uploading...');

        const postData = {
            title: classTitle,
            description: classDescription,
            year: classSelectedYear,
            branch: classSelectedBranch,
            postedBy: facultyName,
        };

        try {
            const response = await fetch('http://localhost:8081/api/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                setClassStatus(`Posted successfully -> ${classTitle}: ${classDescription}`);
                setClassTitle('');
                setClassDescription('');
                setClassSelectedYear('');
                setClassSelectedBranch('');
            } else {
                setClassStatus('Failed to post.');
            }
        } catch (error) {
            console.error('Error posting:', error);
            setClassStatus('Error posting message.');
        }
    };

    const handleFacultySubmit = async (e) => {
        e.preventDefault();
        setFacultyStatus('Uploading...');

        const postData = {
            title: facultyTitle,
            description: facultyDescription,
            postedBy: facultyName,
        };

        try {
            const response = await fetch('http://localhost:8081/api/faculty-announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                setFacultyStatus(`Posted successfully -> ${facultyTitle}: ${facultyDescription}`);
                setFacultyTitle('');
                setFacultyDescription('');
            } else {
                setFacultyStatus('Failed to post.');
            }
        } catch (error) {
            console.error('Error posting:', error);
            setFacultyStatus('Error posting message.');
        }
    };

    const getBranchOptions = () => {
        const allBranches = [
            'Computer Science and Technology',
            'Information Technology',
            'Data Science',
            'Computer Engineering',
            'Artificial Intelligence',
            'Electronics and Communication'
        ];

        return classSelectedYear === 'Fourth Year'
            ? allBranches.slice(0, 4)
            : allBranches;
    };

    return (
        <>
            <div className="faculty-chat-container">
                <h2 className="chat-header">Post to Class</h2>
                <form onSubmit={handleClassSubmit} className="faculty-form">
                    <select required value={classSelectedYear} onChange={(e) => setClassSelectedYear(e.target.value)}>
                        <option value="">Select Year</option>
                        <option value="First Year">First Year</option>
                        <option value="Second Year">Second Year</option>
                        <option value="Third Year">Third Year</option>
                        <option value="Fourth Year">Fourth Year</option>
                    </select>

                    <select required value={classSelectedBranch} onChange={(e) => setClassSelectedBranch(e.target.value)}>
                        <option value="">Select Branch</option>
                        {getBranchOptions().map((branch) => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Title"
                        value={classTitle}
                        required
                        onChange={(e) => setClassTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Write your message here..."
                        value={classDescription}
                        required
                        onChange={(e) => setClassDescription(e.target.value)}
                    ></textarea>

                    <div className="button-wrapper">
                        <button type="submit">Post</button>
                    </div>

                    {classStatus && <p className="status-msg">{classStatus}</p>}
                </form>
            </div>

            {position.includes('Head of Department') && (
                <div className="faculty-chat-container">
                    <h2 className="chat-header">Post to Faculty</h2>
                    <form onSubmit={handleFacultySubmit} className="faculty-form">
                        <input
                            type="text"
                            placeholder="Title"
                            value={facultyTitle}
                            required
                            onChange={(e) => setFacultyTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Write your message here..."
                            value={facultyDescription}
                            required
                            onChange={(e) => setFacultyDescription(e.target.value)}
                        ></textarea>

                        <div className="button-wrapper">
                            <button type="submit">Post</button>
                        </div>

                        {facultyStatus && <p className="status-msg">{facultyStatus}</p>}
                    </form>
                </div>
            )}

            <div className="chat-container">
                <h2 className="chat-header">Faculty Announcements</h2>
                <div className="chat-box">
                    {facultyAnnouncements.length > 0 ? (
                        facultyAnnouncements.map((announcement, index) => (
                            <div className="chat-message" key={index}>
                                <div className="message-content">
                                    <strong>{announcement.title}</strong>
                                    <p>{announcement.description}</p>
                                    <p className="posted-by">Posted by: {announcement.postedBy}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-messages">No faculty announcements yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default FacultyCommunity;
