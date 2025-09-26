import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Interview.css"; 
import { useLocation } from "react-router-dom";

function Interview() {
  const location = useLocation();
  const { resumeData } = location.state;
  const videoRef = useRef(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(60);

  // --- PROCTORING ---
  useEffect(() => {
    if (!interviewStarted) return;

    // Camera + mic
    navigator.mediaDevices.getUserMedia({ video: { width: 160, height: 120 }, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        startSnapshotInterval(stream);
      })
      .catch(err => {
        console.error("Camera error:", err);
        alert("Failed to access camera or microphone");
      });

    // Fullscreen
    document.documentElement.requestFullscreen().catch(() => {});

    // Tab/window tracking
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.exitFullscreen().catch(() => {});
    };
  }, [interviewStarted]);

  const handleBlur = () => sendActivity("blur");
  const handleFocus = () => sendActivity("focus");

  const sendActivity = async (type) => {
    try {
      await axios.post("http://localhost:8080/interview/log-activity", {
        candidateId: resumeData.email,
        timestamp: Date.now(),
        type,
      });
    } catch (err) {
      console.error("Activity log failed:", err);
    }
  };

  const startSnapshotInterval = (stream) => {
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 120;
    const ctx = canvas.getContext("2d");

    setInterval(async () => {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL("image/jpeg");
      try {
        await axios.post("http://localhost:8080/interview/snapshot", {
          candidateId: resumeData.email,
          timestamp: Date.now(),
          imageBase64,
        });
      } catch (err) {
        console.error("Snapshot upload failed:", err);
      }
    }, 5000);
  };

  // --- START INTERVIEW ---
  const startInterview = () => {
    setInterviewStarted(true);
    axios.post("http://localhost:8080/interview/generate", { skills: resumeData.skills })
      .then(res => setQuestions(res.data))
      .catch(err => console.warn("Questions not ready yet:", err));
  };

  const handleAnswerChange = (e) => setAnswers({ ...answers, [currentIndex]: e.target.value });

  const submitInterview = async () => {
    try {
      await axios.post("http://localhost:8080/interview/submit", {
        candidateId: resumeData.email,
        answers,
      });
      alert("Interview submitted successfully!");
      document.exitFullscreen();
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  if (!interviewStarted) {
    return (
      <div className="interview-start">
        <h2>Welcome {resumeData.name}</h2>
        <button onClick={startInterview}>Start Interview</button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex] || { question: "Loading question...", difficulty: "N/A" };

  return (
    <div className="interview-fullscreen">
      {/* Webcam small preview */}
      <video ref={videoRef} className="cam-preview" />

      {/* Main two-column layout */}
      <div className="interview-columns">
        {/* Left: Answer Section */}
        <div className="answer-section">
          <h3>Answer</h3>
          <textarea
            value={answers[currentIndex] || ""}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
          />
          <div className="navigation-buttons">
            {currentIndex > 0 && (
              <button onClick={() => { setCurrentIndex(prev => prev - 1); setTimer(60); }}>Previous</button>
            )}
            {currentIndex < questions.length - 1 ? (
              <button onClick={() => { setCurrentIndex(prev => prev + 1); setTimer(60); }}>Next</button>
            ) : (
              <button onClick={submitInterview}>Submit Interview</button>
            )}
          </div>
        </div>

        {/* Right: Question Section */}
        <div className="question-section">
          <h3>Question {currentIndex + 1}/{questions.length || "?"}</h3>
          <p><strong>Difficulty:</strong> {currentQuestion.difficulty}</p>
          <p>{currentQuestion.question}</p>
          <div className="timer">Time left: {timer}s</div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
