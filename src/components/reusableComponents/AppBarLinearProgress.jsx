"use client"

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate({ darkMode, prefersDarkMode }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 90);
      });
    }, 1500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color={
        darkMode == "dark" || prefersDarkMode == true ?  "inherit" 
      : 
      darkMode == "light" && prefersDarkMode == true ? "primary" 
      : 
      "primary"
      } variant="determinate" value={progress} />
    </Box>
  );
}