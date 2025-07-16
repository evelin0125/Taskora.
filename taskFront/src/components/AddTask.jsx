

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';

export default function AddTask() {
  const [d, setD] = useState({ title: '', deadline: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setD({ ...d, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/', 
        { title: d.title, deadline: d.deadline },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/task');
    } catch (err) {
      alert('Failed to add task');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        bgcolor: '#f5f5f5',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(255,255,255,0.7)',
          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 3,
          minWidth: 350,
          maxWidth: 500,
          margin: 'auto',
          background: 'rgba(255,255,255,0.85)',
          zIndex: 1,
          fontFamily: 'Poppins, Arial, sans-serif',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          color="primary"
          sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}
        >
          Add Task
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}
        >
          <TextField
            label="Task Title"
            variant="outlined"
            name="title"
            value={d.title}
            onChange={inputHandler}
            fullWidth
            InputProps={{ style: { fontFamily: 'Poppins, Arial, sans-serif' } }}
            InputLabelProps={{ style: { fontFamily: 'Poppins, Arial, sans-serif' } }}
          />
          <TextField
            label="Deadline"
            variant="outlined"
            type="datetime-local"
            name="deadline"
            value={d.deadline}
            onChange={inputHandler}
            fullWidth
            InputLabelProps={{
              shrink: true,
              style: { fontFamily: 'Poppins, Arial, sans-serif' },
            }}
            InputProps={{ style: { fontFamily: 'Poppins, Arial, sans-serif' } }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddTask}
            fullWidth
            sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}
          >
            Add
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}