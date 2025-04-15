import React, { useState, useEffect } from 'react';
import './TalkUMIT.css';
import { Filter } from 'bad-words';  // Import profanity filter

const TalkUMIT = ({ studentName }) => {
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [posts, setPosts] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const filter = new Filter();  // Initialize the profanity filter

    // Hindi abusive words list
    const hindiProfanities = [
        'kutti', 'chutiya', 'gandu', 'gandu', 'chu', 'randi', 'bdsk', 'msdk', 'f off', 'dumb', 'idiot', 'crazy', 'stupid', 'maa ki', // Add more words as needed
    ];

    // Function to check for Hindi profanities
    const containsHindiProfanity = (message) => {
        return hindiProfanities.some((word) => message.toLowerCase().includes(word));
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/talks');
                const data = await response.json();
                if (data.success) {
                    // Sanitize descriptions before setting posts
                    const sanitizedPosts = data.talks.map(post => ({
                        ...post,
                        description: filter.clean(post.description), // Clean description
                    }));
                    setPosts(sanitizedPosts.reverse());
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

        // Check for profanity in both English and Hindi
        if (filter.isProfane(message) || containsHindiProfanity(message)) {
            setStatus('Your message contains inappropriate language. Please remove it.');
            return;
        }

        setStatus('Posting...');

        const postData = {
            title: category,
            description: message,
            postedBy: studentName,
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
                if (newData.success) {
                    // Sanitize new posts before setting
                    const sanitizedNewPosts = newData.talks.map(post => ({
                        ...post,
                        description: filter.clean(post.description), // Clean description
                    }));
                    setPosts(sanitizedNewPosts.reverse());
                }
            } else {
                setStatus('Failed to post.');
            }
        } catch (error) {
            console.error('Error posting message:', error);
            setStatus('Error posting message.');
        }
    };

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
                                    <p className="post-time">{new Date(post.timestamp).toLocaleString()}</p>
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
