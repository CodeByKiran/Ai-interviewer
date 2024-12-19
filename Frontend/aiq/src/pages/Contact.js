import React, { useState, useRef } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the form data as an object
    const formData = {
      Name: name,
      Email: email,
      Message: message,
    };

    // Fetch request to Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbzyxkPPDjxbOxjBjOzl-HhnVykKL0LEg4Kyxz6d23rphh-clNgP5SLe8rUOk7K1lHfMhA/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Successfully submitted:", data);
        if (data.status === 'success') {
          setSuccess(true);
          setError(false);
          setName('');
          setEmail('');
          setMessage('');
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        setError(true);
        setSuccess(false);
      });
  };

  return (
    <Container maxWidth="sm" style={{ padding: '2rem' }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or feedback, feel free to reach out to us.
        </Typography>

        {success && <Alert severity="success">Message sent successfully!</Alert>}
        {error && <Alert severity="error">Failed to send the message. Please try again later.</Alert>}

        <form ref={formRef} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Your Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Your Message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
            type="submit"
          >
            Send Message
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Contact;
