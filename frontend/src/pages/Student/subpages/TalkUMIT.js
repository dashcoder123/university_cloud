import React, { useState, useEffect } from 'react';
import './TalkUMIT.css';

const TalkUMIT = ({ studentName }) => {  // Receive studentName as a prop
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [posts, setPosts] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');  // Filter for category

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/talks');
                const data = await response.json();

                if (data.success) {
                    setPosts(data.talks.reverse()); // Show latest first
                } else {
                    console.error('Failed to fetch student discussions');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Posting...');

        const postData = {
            title: category,
            description: message,
            postedBy: studentName,  // Use the passed studentName
        };

        try {
            const response = await fetch('http://localhost:8081/api/talks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                setStatus('Posted successfully!');
                setCategory('');
                setMessage('');

                // Refresh posts
                const newPosts = await fetch('http://localhost:8081/api/talks');
                const newData = await newPosts.json();
                if (newData.success) setPosts(newData.talks.reverse());
            } else {
                setStatus('Failed to post.');
            }
        } catch (error) {
            console.error('Error posting message:', error);
            setStatus('Error posting message.');
        }
    };

    // Helper function to format the date and time
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();  // Format as "MM/DD/YYYY, HH:MM AM/PM"
    };

    // Filter posts by category
    const filteredPosts = filterCategory
        ? posts.filter((post) => post.title === filterCategory)
        : posts;

    return (
        <>
            <div className="talk-container">
                <h2 className="talk-header">Talk UMIT - Ask Your Doubts</h2>
                <form onSubmit={handleSubmit} className="talk-form">
                    <select required value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Hostel/PG Issues">Hostel/PG Issues</option>
                        <option value="Major Project Issues">Major Project Issues</option>
                        <option value="Backlog Queries">Backlog Queries</option>
                        <option value="Placement Doubts">Placement Doubts</option>
                        <option value="Other">Other</option>
                    </select>

                    <textarea
                        placeholder="What's on your mind?"
                        value={message}
                        required
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <div className="button-wrapper">
                        <button type="submit" disabled={status === 'Posting...'}>Post</button>
                    </div>

                    {status && <p className="status-msg">{status}</p>}
                </form>
            </div>

            {/* Category Filter Section */}
            <div className="filter-container">
                <h3>Filter by Category</h3>
                <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
                    <option value="">All Categories</option>
                    <option value="Hostel/PG Issues">Hostel/PG Issues</option>
                    <option value="Major Project Issues">Major Project Issues</option>
                    <option value="Backlog Queries">Backlog Queries</option>
                    <option value="Placement Doubts">Placement Doubts</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="chat-container">
                <h2 className="chat-header">Student Posts</h2>
                <div className="chat-box">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <div className="chat-message" key={index}>
                                <div className="message-content">
                                    <p><strong>{post.title}</strong></p>
                                    <p>{post.description}</p>
                                    <p className="posted-by">Posted by: {post.postedBy}</p>
                                    <p className="post-time">{formatDate(post.timestamp)}</p> {/* Display the formatted timestamp */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-messages">No discussions yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default TalkUMIT;
