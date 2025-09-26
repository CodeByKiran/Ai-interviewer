import React, { useState } from 'react';
import axios from 'axios';
import './ResumeUpload.css';
import { useNavigate } from 'react-router-dom';

function ResumeUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  // File selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
      setUploadStatus('');
      setResumeData(null);
    }
  };

  // Drag & drop
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setResumeFile(e.dataTransfer.files[0]);
      setUploadStatus('');
      setResumeData(null);
    }
  };

  // Upload file
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setUploadStatus('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', resumeFile);

    try {
      const response = await axios.post(
        'http://localhost:8080/resume/upload',
        formData
      );

      setResumeData(response.data);
      setUploadStatus('Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Failed to upload resume');
    }
  };

  // Take Interview button click
  const handleTakeInterview = () => {
    if (!resumeData) return;
    navigate('/interview', { state: { resumeData } });
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Resume</h2>
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
            style={{ display: 'none' }}
          />
          {resumeFile ? (
            <p>{resumeFile.name}</p>
          ) : (
            <p>Drag & drop your resume here, or click to select a file</p>
          )}
        </div>
        <button type="submit">Upload</button>
      </form>

      {uploadStatus && <p className="status">{uploadStatus}</p>}

      {resumeData && (
        <>
          <div className="resume-data">
            <div className="resume-section">
              <h3>Basic Info</h3>
              <p><strong>Name:</strong> {resumeData.name}</p>
              <p><strong>Email:</strong> {resumeData.email}</p>
              <p><strong>Phone:</strong> {resumeData.phone}</p>
              {resumeData.linkedin && <p><strong>LinkedIn:</strong> {resumeData.linkedin}</p>}
              {resumeData.github && <p><strong>GitHub:</strong> {resumeData.github}</p>}
            </div>

            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="resume-section">
                <h3>Skills</h3>
                <ul>{resumeData.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            )}

            {/* Add other sections: Experience, Projects, Education, Certifications as needed */}

          </div>

          {/* Take Interview Button */}
          <div className="take-interview">
            <button onClick={handleTakeInterview}>Take Interview</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ResumeUpload;
