import React, { useState } from 'react';
import axios from 'axios';
import './ResumeUpload.css'; 

function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!resume) {
      setUploadStatus('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', resume);

    try {
      const response = await axios.post('http://localhost:8080/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Failed to upload resume');
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setResume(e.dataTransfer.files[0]);
      setUploadStatus('');
    }
  };

  return (
    <div className="upload-container">
      <h2><center>Upload Your Resume</center></h2>
      <form onSubmit={handleUpload} className="upload-form">
        <div 
          className="drop-zone" 
          onDragOver={handleDragOver} 
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input 
            type="file" 
            id="file-input" 
            accept=".pdf,.doc,.docx" 
            onChange={handleFileChange} 
            style={{ display: 'none' }} // Hide the input
          />
          {resume ? (
            <p>{resume.name}</p>
          ) : (
            <p><center>Drag & drop your resume here, or click to select a file</center></p>
          )}
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default ResumeUpload;