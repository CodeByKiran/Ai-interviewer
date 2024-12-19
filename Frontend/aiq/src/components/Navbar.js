// src/components/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../ThemeContext';
import '../App.css';

const Navbar = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" >
          <img src='title_logo.png' alt ="" width={182} height={64} />
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          AI-Interviewer
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/ResumeUpload">
          Upload Resume 
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About Us
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact Us
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Sign Up
        </Button>
        <IconButton className="theme-toggle-button" color="inherit" onClick={colorMode.toggleColorMode}>
          <span>&#9788;</span>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
