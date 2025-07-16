import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

export default function SignUp() {
  const [d, setD] = useState({ email: '', password: '' }); // ✅ renamed 'pass' to 'password'
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setD({ ...d, [e.target.name]: e.target.value });
    console.log(d);
  };

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:3000/register', {
        email: d.email,
        password: d.password,
      });
      alert('Signup successful!');
      navigate('/'); // ✅ Adjusted redirect
    } catch (err) {
      alert('Signup failed');
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
        backgroundImage: 'url(https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1500&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(255,255,255,0.7)',
          zIndex: 0,
        }}
      />
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 3,
          minWidth: 350,
          background: 'rgba(255,255,255,0.85)',
          zIndex: 1,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Sign Up
        </Typography>
        <Box component="form" display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            type="email"
            value={d.email}
            onChange={inputHandler}
            fullWidth
          />
          <TextField
            label="Password"
            name="password" // ✅ corrected name
            variant="outlined"
            type="password"
            value={d.password} // ✅ corrected value
            onChange={inputHandler}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSignup}
            fullWidth
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
