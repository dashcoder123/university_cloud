import React, { useState } from 'react';
import './Community.css';

const FacultyCommunity = ({ facultyName }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Uploading...');

        const postData = {
            title,
            description,
            year: selectedYear,
            branch: selectedBranch,
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
                setStatus(`Posted successfully -> ${title}: ${description}`);
                setTitle('');
                setDescription('');
                setSelectedYear('');
                setSelectedBranch('');
            } else {
                setStatus('Failed to post.');
            }
        } catch (error) {
            console.error('Error posting:', error);
            setStatus('Error posting message.');
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

        return selectedYear === 'Fourth Year'
            ? allBranches.slice(0, 4)
            : allBranches;
    };

    return (
        <div className="faculty-chat-container">
            <h2 className="chat-header">Post to Class</h2>
            <form onSubmit={handleSubmit} className="faculty-form">
                <select required value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
                </select>

                <select required value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                    <option value="">Select Branch</option>
                    {getBranchOptions().map((branch) => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Write your message here..."
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className="button-wrapper">
                    <button type="submit">Post</button>
                </div>

                {status && <p className="status-msg">{status}</p>}
            </form>
        </div>
    );
};

export default FacultyCommunity;
