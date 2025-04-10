import React, { useState } from "react";
import "./Chatbot.css";

const faqs = [
    {
        question: "When does the Semester start?",
        answer: "The semester starts on June 1st, 2025.",
    },
    {
        question: "Where is the faculty room?",
        answer: "The faculty room is on the second floor, Room 204.",
    },
    {
        question: "When will our results be out?/When will our exams be conducted/When will our exam dates be released?",
        answer: "Navigate to the 'Raise a Ticket' section. Write a formal email to the Exam Section through 'Exam Related Queries'.",
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
