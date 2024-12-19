import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import FeedbackIcon from '@mui/icons-material/Feedback';
import EngineeringIcon from '@mui/icons-material/Engineering';
import InsightsIcon from '@mui/icons-material/Insights';
import InterviewIcon from '@mui/icons-material/QuestionAnswer';

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  textAlign: 'center',
  backgroundColor: '#424242',
  color: '#ffffff',
  borderRadius: '12px',
  boxShadow: theme.shadows[3],
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'scale(1.05)',
    transition: 'all 0.3s ease',
  },
}));

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: '2rem' }}>
      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" gutterBottom>
          Welcome to AIQ 🤖
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Revolutionizing Interviews with Cutting-Edge AI Technology
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Box mb={6}>
        <Typography variant="h4" gutterBottom>
          Our Mission 🚀
        </Typography>
        <Typography variant="body1">
          At <strong>AIQ</strong>, we are committed to transforming the interview process by using advanced AI technology. Our goal is to help candidates feel more prepared and confident by simulating interviews tailored to their resumes and job descriptions. We provide actionable feedback and personalized tips, empowering users to excel in their job search.
        </Typography>
      </Box>

      {/* What We Offer Section */}
      <Box mb={6}>
        <Typography variant="h4" gutterBottom>
          What We Offer 💼
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CustomPaper>
              <Avatar sx={{ bgcolor: '#0066cc', padding: '0.75rem' }}>
                <InterviewIcon />
              </Avatar>
              <Typography variant="h5" mt={2}>
                AI-Powered Interview Simulations
              </Typography>
              <Typography variant="body2">
                Experience realistic interview simulations customized to match job descriptions and your profile, helping you practice and improve.
              </Typography>
            </CustomPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomPaper>
              <Avatar sx={{ bgcolor: '#ff9800', padding: '0.75rem' }}>
                <FeedbackIcon />
              </Avatar>
              <Typography variant="h5" mt={2}>
                Real-Time Feedback
              </Typography>
              <Typography variant="body2">
                Get instant feedback on your responses, body language, and communication skills to help you refine your interview techniques.
              </Typography>
            </CustomPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomPaper>
              <Avatar sx={{ bgcolor: '#4caf50', padding: '0.75rem' }}>
                <InsightsIcon />
              </Avatar>
              <Typography variant="h5" mt={2}>
                Data-Driven Insights
              </Typography>
              <Typography variant="body2">
                Leverage analytics to gain deep insights into your performance and identify areas for improvement.
              </Typography>
            </CustomPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomPaper>
              <Avatar sx={{ bgcolor: '#9c27b0', padding: '0.75rem' }}>
                <EngineeringIcon />
              </Avatar>
              <Typography variant="h5" mt={2}>
                Scalable Solutions
              </Typography>
              <Typography variant="body2">
                Our platform is designed to support individuals and businesses of all sizes, providing scalable solutions for interview preparation.
              </Typography>
            </CustomPaper>
          </Grid>
        </Grid>
      </Box>

      {/* Our Process Section */}
      <Box mb={6}>
        <Typography variant="h4" gutterBottom>
          Our Process 🔄
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={4}>
            <img src="resume.jpg" alt="Upload Resume" style={{ width: '50%', borderRadius: '8px' }} />
            <Typography variant="h6" align="centre-left" mt={2}>
              Upload Your Resume
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src="ai.jpg" alt="AI Analysis" style={{ width: '50%', borderRadius: '8px' }} />
            <Typography variant="h6" align="centre-left" mt={2}>
              AI-Driven Analysis
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src="feedback.jpg" alt="Personalized Feedback" style={{ width: '50%', borderRadius: '8px' }} />
            <Typography variant="h6" align="centre-left" mt={2}>
              Get Personalized Feedback
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box textAlign="center" py={4} bgcolor="#0066cc" color="white" borderRadius="8px">
        <Typography variant="h4" gutterBottom>
          Get in Touch with Us Today!
        </Typography>
        <Typography variant="body1">
          Have questions or want to learn more about our services?{' '}
          <a href="/contact" style={{ color: '#ffeb3b', textDecoration: 'underline' }}>
            Reach out to us
          </a>{' '}
          and we’ll be happy to assist you on your journey.
        </Typography>

      </Box>
    </Container>
  );
};

export default About;