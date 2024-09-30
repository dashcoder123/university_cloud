import React from 'react'
import { FiLink } from "react-icons/fi";
import { FaDownload} from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

import './Payment.css'; 


const Payment = () => {
  return (
<div className="container">
    <div className="header">
      <h1 className='Paymentbar'><strong>Payment and Bills</strong></h1>
    </div>
    <div className="results-container">
    <div className="results-box" id='box-1'>
    <div className='downloads'>
          <h2>Latest fee receipt:</h2>
          <button><FaDownload /></button>
          </div>
          <div className='downloads'>
          <h2>Payment Portal:</h2>
          <button><FaExternalLinkAlt />
          </button>
          </div>
        <div className='downloads'>
          <h2>Outstanding fees:</h2>
          <button><FaDownload />
          </button>
          </div>
        </div>
        <div className="results-box">
          <h2>Payment Updates:</h2>
          <div className="info-box">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet nisi at elit venenatis fringilla. Cras ut semper quam, sit.  <FiLink />
      </div>
      <div className="info-box">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet nisi at elit venenatis fringilla. Cras ut semper quam, sit.  <FiLink />
      </div>
      <div className="info-box">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet nisi at elit venenatis fringilla. Cras ut semper quam, sit.  <FiLink />
      </div>
        </div>
      </div>

  </div>
  )
}

export default Payment