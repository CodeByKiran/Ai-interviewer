import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRecordWebcam } from 'react-record-webcam';
import CameraPreview from './CameraPreview'; 

const MockInterview = () => {
  const { subject } = useParams();
  const location = useLocation();
  const resumeText = location.state?.resumeText || '';
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const recordWebcam = useRecordWebcam({ frameRate: 60 });

  // Fetch questions from backend when the component is mounted
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/interview/generateQuestion?topic=${subject}`);
        if (response.ok) {
          const data = await response.json();
          if (data.message === "Success" && data.questions) {
            const questionArray = data.questions.split("\n\n");
            setQuestions(questionArray);
            setLoading(false);
          } else {
            setError("No questions available");
            setLoading(false);
          }
        } else {
          setError("Failed to load questions");
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching questions");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subject]);  // Re-run when subject changes
  
  const saveFile = async () => {
    const blob = await recordWebcam.getRecording();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const nextQuestion = () => {
    if (isStarted) {
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    } else {
      setIsStarted(true);
    }
    setUserInput(''); // Clear the input when moving to the next question
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#f4f4f9' }}>
      <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
        <CameraPreview />
      </div>

      <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',height:'' }}>
        {loading ? (
          <p style={{ fontSize: '18px', color: '#333' }}>Loading questions...</p>
        ) : error ? (
          <p style={{ color: '#e74c3c', fontSize: '18px' }}>{error}</p>
        ) : (
          <div className="text-center text-black mt-4">
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Current Question:</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555', textAlign: 'center' }}>{questions[currentQuestionIndex]}</p>
            
            {/* Input area for user to type their answer */}
            <textarea 
              placeholder="Your answer here..." 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows="4" 
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '20px',
                fontSize: '16px',
                borderRadius: '50px',
                border: '1px solid #ddd',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box',
                height : '50%'
              }}
            />

            {/* Button that changes text based on whether the quiz has started */}
            <button 
              onClick={nextQuestion} 
              style={{ 
                backgroundColor: '#f39c12', 
                color: '#fff', 
                padding: '10px 20px', 
                borderRadius: '6px', 
                border: 'none', 
                cursor: 'pointer', 
                marginTop: '20px', 
                fontSize: '16px',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e67e22'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f39c12'}
            >
              {isStarted ? 'Next Question' : "Let's Start"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterview;
