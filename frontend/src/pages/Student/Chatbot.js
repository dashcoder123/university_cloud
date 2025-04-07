import React, { useState } from "react";
import "./Chatbot.css";
import Fuse from "fuse.js";

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
        question: "How do I apply for leave?",
        answer: "You can apply for leave through the UMIT portal under 'Student Services'.",
    },
];

const fuse = new Fuse(faqs, {
    keys: ["question"],
    threshold: 0.4,
});

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);

    const toggleBot = () => setIsOpen(!isOpen);

    const handleSend = () => {
        if (!input.trim()) return;

        const response = fuse.search(input);
        const answer =
            response.length > 0
                ? response[0].item.answer
                : "Sorry, I couldn't find an answer to that. Kindly contact your CR/SR for further queries.";

        setChat([...chat, { question: input, answer }]);
        setInput("");
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
                                <div className="chat-question">You: {entry.question}</div>
                                <div className="chat-answer">Bot: {entry.answer}</div>
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;
