import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

export default function Login() {
  
  const navigate = useNavigate();
 var [d,setD]=useState({email:'',password:''})
const handleLogin = () => {
  axios.post('http://localhost:3000/login', { email: d.email, password: d.password })
    .then(res => {
      localStorage.setItem('token', res.data.token); // Store token in localStorage
      alert('Login successful!');
      navigate('/navigate'); // Redirect after login (change as needed)
    })
    .catch(err => {
      alert('Login failed. Please check your credentials.');
    });
};
const inputHandler=async (e)=>{
//  console.log(e);
 
  setD({...d,[e.target.name]:e.target.value})
console.log(d);
 }
  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        bgcolor: '#f5f5f5',
        backgroundImage: 'url(https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80)',
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
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3, minWidth: 350, background: 'rgba(255,255,255,0.85)', zIndex: 1 }}>
        <Typography variant='h4' align='center' gutterBottom color="primary">Login</Typography>
        <Box component="form" display="flex" flexDirection="column" gap={3}>
          <TextField 
            label="Username" 
            variant="outlined" 
            name='email'
            value={d.email} 
            onChange={inputHandler} 
            fullWidth
          />
          <TextField 
            label="Password" 
            variant="outlined" 
            type="password" 
            name='password'
            value={d.password} 
            onChange={inputHandler} 
            fullWidth
          />
          <Button 
            variant='contained' 
            color='primary' 
            size='large' 
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            size='large'
            onClick={handleSignUp}
            fullWidth
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}