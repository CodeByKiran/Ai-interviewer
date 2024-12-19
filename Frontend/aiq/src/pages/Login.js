import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { borderRadius } from '@mui/system';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    
    const loginUser = { username, password };
    setLoading(true); // Set loading state when the request is being made

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUser),
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error("Error response:", text);
        alert('Login failed: ' + text);
        setLoading(false);
        return;
      }
  
      const data = await response.json();
      console.log("Response data:", data);
  
      if (data.message === "Login successful") {
        setOpenSnackbar(true); // Show success Snackbar
        setTimeout(() => {
          navigate('/Dashboard'); // Redirect to Dashboard after a delay
        }, 1500); // Adjust delay as needed
      } else {
        alert('Unexpected response');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" style={{ padding: '2rem' }}>
      <Box component="form" onSubmit={handleLogin}>
        <Typography variant="h4" gutterBottom>
          Login
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
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '1rem' ,borderRadius:'20px'}}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Box>

      {/* Snackbar for success message */}
      <center><Snackbar open={openSnackbar} autoHideDuration={1500} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Login Successful
        </Alert>
      </Snackbar>
      </center>
    </Container>
  );
};

export default Login;