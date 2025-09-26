// src/components/Footer.js
import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme(); 

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        p: 2,
        textAlign: 'center',
        position: 'flex',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} AI-Interviewer.  Made by SaiKiran <span>❤️</span> All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
