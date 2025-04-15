import React, { useEffect, useState } from 'react';
import './TeachingMaterial.css';
import axios from 'axios';

const TeachingMaterial = ({ id }) => {
  const [teachingInfo, setTeachingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachingInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/teachinginfo/${id}`);
        setTeachingInfo(response.data);
      } catch (err) {
        setError('Failed to fetch teaching information');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTeachingInfo();
    }
  }, [id]);

  // Now, just use the fixed link (Google link) directly when button is clicked
  const openGoogleLink = () => {
    window.open('https://docs.google.com/presentation/d/1O7REmcyrIIGdZOIm898c4OKKADYLhIzm/edit?usp=sharing&ouid=115047623495942414050&rtpof=true&sd=true', '_blank');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!teachingInfo) return <div>No teaching information available.</div>;

  return (
    <div className="container">
      <div className="header">
        <h1 className='Materialbar'><strong>Teaching Materials</strong></h1>
      </div>
      <div className="material-container">
        {teachingInfo.teachingInfo?.map((info, index) => (
          <div key={index} className="info-box">
            <p><strong>{info}</strong></p>
            <button 
              className="info-button" 
              onClick={openGoogleLink}>View Material</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachingMaterial;
