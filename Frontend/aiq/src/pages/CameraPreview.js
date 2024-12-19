import React, { useEffect, useRef, useState } from 'react';

const CameraPreview = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null); // Reference for the MediaRecorder
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  // Function to start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  // Function to stop the camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraOn(false);
      setIsRecording(false);
    }
  };

  // Function to start recording
  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      mediaRecorderRef.current = new MediaRecorder(videoRef.current.srcObject, {
        mimeType: 'video/webm',
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Function to download the recorded video
  const downloadRecording = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    a.click();
    URL.revokeObjectURL(url);
    setRecordedChunks([]); // Reset chunks after download
  };

  useEffect(() => {
    // Cleanup function to stop the camera and recording when component unmounts
    return () => {
      stopCamera();
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={styles.video}
        className={isCameraOn ? 'active' : 'inactive'}
      />
      <div style={styles.buttonContainer}>
        <button
          onClick={startCamera}
          style={{ ...styles.button, backgroundColor: '#4CAF50' }} // Green color
          disabled={isCameraOn}
        >
          Start Camera
        </button>
        <button
          onClick={stopCamera}
          style={{ ...styles.button, backgroundColor: '#f44336' }} // Red color
          disabled={!isCameraOn || isRecording} // Fixed the condition
        >
          Stop Camera
        </button>
        <button
          onClick={startRecording}
          style={{ ...styles.button, backgroundColor: '#4CAF50' }} // Green color
          disabled={!isCameraOn || isRecording} // Fixed the condition
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          style={{ ...styles.button, backgroundColor: '#FFA500' }} // Orange color
          disabled={!isRecording}
        >
          Stop Recording
        </button>
        <button
          onClick={downloadRecording}
          style={{ ...styles.button, backgroundColor: '#a881af' }} // download button
          disabled={recordedChunks.length === 0}
        >
          Download Recording
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  video: {
    width: '100%',
    maxWidth: '1000px',
    border: '1px solid #ddd',
    borderRadius: '18px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '6px 12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
};

export default CameraPreview;
