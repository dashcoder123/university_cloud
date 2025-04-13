import React, { useEffect, useState } from 'react';
import { FiLink } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

import './Payment.css';

const Payment = ({ id, role }) => {
  const [hashedId, setHashedId] = useState('');

  // Hash function to generate SHA-1 of PRN
  const hashPRN = async (input) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    if (id) {
      hashPRN(id).then(hashed => {
        console.log("Hashed ID:", hashed);
        setHashedId(hashed);
      });
    }
  }, [id]);

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
                <button>
                  <FaDownload />
                </button>
              </a>
            ) : (
              <p className="error-text">No ID available for receipt.</p>
            )}
          </div>

          <div className='downloads'>
            <h2>Payment Portal:</h2>
            <a
              href="https://sndt.unisuite.in/paylist/umit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <FaExternalLinkAlt />
              </button>
            </a>
          </div>

          <div className='downloads'>
            <h2>Outstanding fees:</h2>
            <button>
              <FaDownload />
            </button>
          </div>
        </div>

        <div className="results-box">
          <h2>Payment Updates:</h2>
          <div className="info-box">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet nisi at elit venenatis fringilla. Cras ut semper quam, sit. <FiLink />
          </div>
          <div className="info-box">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet nisi at elit venenatis fringilla. Cras ut semper quam, sit. <FiLink />
          </div>
          <div className="info-box">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet nisi at elit venenatis fringilla. Cras ut semper quam, sit. <FiLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
