import React, { useEffect, useState } from 'react';
import './TeachingMaterial.css';
import axios from 'axios';

const TeachingMaterial = ({ id }) => {
  const [teachingInfo, setTeachingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syllabusLink, setSyllabusLink] = useState('');

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

  // Fetch the syllabus link when button is clicked
  const fetchSyllabusLink = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/syllabus/${courseId}`);
      if (response.data.success) {
        setSyllabusLink(response.data.syllabusLink);
        window.open(response.data.syllabusLink, '_blank');
      } else {
        setError('Syllabus not found');
      }
    } catch (err) {
      setError('Failed to fetch syllabus');
    }
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
              onClick={() => fetchSyllabusLink(info)}>View Material</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachingMaterial;
