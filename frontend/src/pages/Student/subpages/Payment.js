import React, { useEffect, useState } from 'react';
import { FiLink } from "react-icons/fi";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import axios from 'axios';
import './Payment.css';

const Payment = ({ id, role }) => {
  const [hashedId, setHashedId] = useState('');
  const [paymentPortalLink, setPaymentPortalLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hash function to generate SHA-1 of PRN
  const hashPRN = async (input) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const hashed = await hashPRN(id);
          setHashedId(hashed);
          console.log("Hashed ID:", hashed);
        }

        const response = await axios.get(`http://localhost:8081/api/syllabus/paymentportal`);
        if (response.data && response.data.syllabusLink) {
          setPaymentPortalLink(response.data.syllabusLink);
        }
      } catch (err) {
        console.error('Error fetching data', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1 className='Paymentbar'><strong>Payment and Bills</strong></h1>
      </div>
      <div className="results-container">
        <div className="results-box" id='box-1'>

          <div className='downloads'>
            <h2>Latest fee receipt:</h2>
            {hashedId ? (
              <a
                href={`https://e455-106-66-226-240.ngrok-free.app/v1/AUTH_test/receipts/${hashedId}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <button><FaDownload /></button>
              </a>
            ) : (
              <p className="error-text">No ID available for receipt.</p>
            )}
          </div>

          <div className='downloads'>
            <h2>Payment Portal:</h2>
            {paymentPortalLink ? (
              <a
                href={paymentPortalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button><FaExternalLinkAlt /></button>
              </a>
            ) : (
              <p>Portal not available</p>
            )}
          </div>

          <div className='downloads'>
            <h2>Outstanding fees:</h2>
            <button>
              <FaDownload />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;
