import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // State to store real-time statistics
  const [stats, setStats] = useState({
    activeUsers: '0',
    interviewQuestionsSolved: '0',
    interviewHelpHours: '0',
  });

/*  useEffect(() => {
    // Function to fetch real-time stats from backend
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/stats'); // Replace with actual API endpoint
        const data = await response.json();
        
        // Update state with the real-time data
        setStats({
          activeUsers: data.activeUsers,
          interviewQuestionsSolved: data.interviewQuestionsSolved,
          interviewHelpHours: data.interviewHelpHours,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    const intervalId = setInterval(fetchStats, 10000); 
    fetchStats(); 

    return () => clearInterval(intervalId); 
  }, []);*/

  return (
    <Container maxWidth="lg" style={{ padding: '2rem' }}>
      <Box sx={{ textAlign: 'center', padding: '3rem 0', backgroundColor: '#fffff', borderRadius: '8px', marginBottom: '2rem' }}>
        <Typography variant="h2" color="#00000" gutterBottom>
          AI Interviewer - Your Ultimate AI Interview Companion
        </Typography>
        <Typography variant="h6" color="#00000" gutterBottom>
          Prepare for interviews with AI-driven insights and simulated practice sessions tailored to your skills and job goals.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          sx={{ marginTop: '1rem' }} 
          onClick={handleStartJourney} 
        >
          Start Your Journey
        </Button>
      </Box>

      {/*  Real-time Statistics Section 
      <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: '1.5rem', backgroundColor: '#e8f0fe', borderRadius: '8px' }}>
              <Typography variant="h4" color="primary" gutterBottom>{stats.activeUsers}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Active Users</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: '1.5rem', backgroundColor: '#e8f0fe', borderRadius: '8px' }}>
              <Typography variant="h4" color="primary" gutterBottom>{stats.interviewQuestionsSolved}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Interview Questions Solved</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ padding: '1.5rem', backgroundColor: '#e8f0fe', borderRadius: '8px' }}>
              <Typography variant="h4" color="primary" gutterBottom>{stats.interviewHelpHours}</Typography>
              <Typography variant="subtitle1" color="textSecondary">Interview Help Hours</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>*/}



{/* Features Section */}
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Why Choose AI Interviewer?
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: "Personalized Interview Questions", description: "Get customized questions based on your resume and job role." },
            { title: "AI Feedback", description: "Receive AI-powered feedback to improve your responses and body language." },
            { title: "Real-time Analysis", description: "Gain insights on areas of improvement with detailed performance analytics." },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>{feature.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          {[
            { name: "Sai Kiran", feedback: "AI Interview transformed my interview prep, making me feel more confident." },
            { name: "Sri Harsha", feedback: "The AI feedback was so insightful – I improved with each session!" },
          ].map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{testimonial.name}</Typography>
                  <Typography variant="body2" color="textSecondary">"{testimonial.feedback}"</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', padding: '2rem 0', backgroundColor: '#fffff', borderRadius: '8px' }}>
        <Typography variant="h5" color='#00000' gutterBottom>
          Ready to Ace Your Next Interview?
        </Typography>
        <Button variant="contained" color="secondary" size="large" onClick={handleLogin}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Home;