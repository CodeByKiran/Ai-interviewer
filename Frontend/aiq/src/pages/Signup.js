import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const navigate = useNavigate();

  const handleSignup = async () => {
    const userData = {
      username,
      email,
      password,
      confirmPassword,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error("Error response:", text);
        alert('Signup failed: ' + text);
        return;
      }
  
      const data = await response.json();
      console.log("Response data:", data);
  
      if (data.message) {
        setOpenSnackbar(true); // Show success Snackbar
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after a delay
        }, 1500); // Adjust delay as needed
      } else {
        alert('Unexpected response');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('Error: ' + error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" style={{ padding: '2rem' }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          style={{ marginTop: '1rem' }}
        >
          Sign Up
        </Button>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Signup Successful! Redirecting to login...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;