import React, { useState } from 'react';
import './Community.css';

const FacultyCommunity = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Uploading...');

        const postData = {
            title,
            content,
            year: selectedYear,
            branch: selectedBranch,
            postedBy: 'Dr. Sharma', // Replace with actual logged-in faculty name
            date: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://localhost:8081/api/community-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                setStatus('✅ Posted successfully!');
                setTitle('');
                setContent('');
                setSelectedYear('');
                setSelectedBranch('');
            } else {
                setStatus('❌ Failed to post.');
            }
        } catch (error) {
            console.error('Error posting:', error);
            setStatus('❌ Error posting message.');
        }
    };

    const getBranchOptions = () => {
        return selectedYear === '4th'
            ? ['CST', 'IT', 'DS', 'CE']
            : ['CST', 'IT', 'DS', 'CE', 'AI'];
    };

    return (
        <div className="faculty-chat-container">
            <h2 className="chat-header">📤 Post to Community</h2>
            <form onSubmit={handleSubmit} className="faculty-form">

                <select required value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
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
                    value={content}
                    required
                    onChange={(e) => setContent(e.target.value)}
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

