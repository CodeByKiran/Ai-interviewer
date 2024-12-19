// Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // State to store search query
  const [searchQuery, setSearchQuery] = useState('');

  // Subjects for the dashboard
  const subjects = [
    { id: 1, name: 'DBMS' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'MERN Stack' },
    { id: 5, name: 'AWS' },
    { id: 6, name: 'C' },
    { id: 7, name: 'Mysql' },
    { id: 8, name: 'MongoDB' },
    { id: 9, name: 'Ms Excel' },
    { id: 10, name: 'Data Science' },
    { id: 11, name: 'Google Cloud' },
    { id: 12, name: 'Docker' },
    { id: 13, name: 'System Design' },
    { id: 14, name: 'Digital Logics' },
    { id: 15, name: 'React js' },
    { id: 16, name: 'Spring Boot' },
    { id: 17, name: 'Kotlin' },
    { id: 18, name: 'Swift' },
    { id: 19, name: 'Flutter' },
    { id: 20, name: 'Automation' },
    { id: 21, name: 'Machine Learning' },
    { id: 22, name: 'Data Analytics' },
    { id: 23, name: 'Angular js' },
    { id: 24, name: 'Next js' },
    { id: 25, name: 'Microsoft Azure' },
    { id: 26, name: 'Microsoft Excel' },
    { id: 27, name: 'Apps Script' },
    { id: 28, name: 'Agile' },
    { id: 29, name: 'Power Bi' },
    { id: 30, name: 'Devops Tools' }

  ];

  // Filtered subjects based on search query
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (subject) => {
    navigate(`/interviewOn/${subject.toLowerCase()}`);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Dashboard</h1>
      <input
        type="text"
        placeholder="Search subjects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '20%', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', background: '#fffff' }}>
        {filteredSubjects.map((subject) => (
          <div key={subject.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '150px', color: '#00000' }}>
            <h3>{subject.name}</h3>
            <button onClick={() => handleNavigate(subject.name)}>Interview</button>
          </div>
        ))}
        {filteredSubjects.length === 0 && <p>No subjects found</p>}
      </div>
    </div>
  );
};

export default Dashboard;
