import React, { useState } from "react";
import "./Chatbot.css";

const faqs = [
    {
        question: "Where can I view the Academic calendar/ When will the next semester start?",
        answer: "You can find the yearly calendar by heading to the sidebar and clicking on 'Events' 📅",
    },
    {
        question: "Where can i find my timetable?",
        answer: "Sidebar>>Academics. Here you can access your attendance and PYQ/Notes",
    },
    {
        question: "What are the office working hours?/When can I get my railway concession?",
        answer: "Our office working hours are Monday to Friday, 10:00 AM to 5:00 PM. Railway concession hours are 1:00 PM to 3:00 PM. For any enquiries, feel free to call us at: 82914 09346",
    },
    {
        question: "How do I reset my password?/I don't remember my password",
        answer: "Please contact the admin or report to the office with your ID card.",
    },
];

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState([]);

    const toggleBot = () => {
        if (!isOpen && chat.length === 0) {
            setChat([{ question: "", answer: "Hi! How can I help you today?" }]);
        }
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (faq) => {
        setChat((prev) => [...prev, { question: faq.question, answer: faq.answer }]);
    };

    return (
        <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
            <button className="chatbot-toggle" onClick={toggleBot}>
                💬
            </button>

            {isOpen && (
                <div className="chatbot-box">
                    <div className="chatbot-header">
                        <span>Ask UMIT Bot</span>
                        <button onClick={toggleBot}>×</button>
                    </div>

                    <div className="chatbot-body">
                        {chat.map((entry, index) => (
                            <div key={index} className="chat-message">
                                {entry.question && (
                                    <div className="chat-question">You: {entry.question}</div>
                                )}
                                <div className="chat-answer">Bot: {entry.answer}</div>
                            </div>
                        ))}
                    </div>

                    <div className="chatbot-options">
                        {faqs.map((faq, idx) => (
                            <button
                                key={idx}
                                className="option-button"
                                onClick={() => handleOptionClick(faq)}
                            >
                                {faq.question}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;
