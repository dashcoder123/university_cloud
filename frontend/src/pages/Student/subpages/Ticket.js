import React from 'react';
import './RaiseTicket.css';

const TicketCategories = () => {
    const handleCategoryClick = (email, subject) => {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent('Please describe your issue in detail here.')}`;
        window.open(gmailLink, '_blank');
    };

    return (
        <div className="ticket-container">
            <h1 className="ticket-header">Raise a Ticket</h1>
            <div className="ticket-grid">
                <div className="ticket-box" onClick={() => handleCategoryClick('accounts@college.edu', 'Fees Related Query')}>
                    Fees Related Queries
                </div>
                <div className="ticket-box" onClick={() => handleCategoryClick('exam@college.edu', 'Exam Related Query')}>
                    Exam Related Queries
                </div>
                <div className="ticket-box" onClick={() => handleCategoryClick('hostel@college.edu', 'Hostel Related Query')}>
                    Hostel Related Queries
                </div>
                <div className="ticket-box" onClick={() => handleCategoryClick('admin@college.edu', 'General Admin Query')}>
                    General Admin Queries
                </div>
                <div className="ticket-box" onClick={() => handleCategoryClick('info@college.edu', 'Information Correction Query')}>
                    Information Correction Queries
                </div>
            </div>
        </div>
    );
};

export default TicketCategories;
