import { Button, Box, Typography, Paper, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, AppBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png'; // Assuming you have a logo image
const drawerWidth = 220;

export default function NavigatePage() {
  const navigate = useNavigate();
  const [open] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const navItems = [
    { text: 'Add Task', path: '/addtask' },
    { text: 'Task List', path: '/task' },
    { text: 'Calendar', path: '/calender' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url(https://wallpapers.com/images/hd/dark-theme-background-9ia9iwbwftd8ntp3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        fontFamily: 'Poppins, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(14, 10, 10, 0.7)',
          zIndex: 0,
        }}
      />
      {/* AppBar */}
      <AppBar
  position="fixed"
  sx={{
    zIndex: (theme) => theme.zIndex.drawer + 1,
    background: 'linear-gradient(90deg, #1e3a8a 0%, #f59e42 100%)',
    fontFamily: 'Poppins, Arial, sans-serif',
  }}
>
  <Toolbar>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <img
        src={logo}
        alt="TaskManager Logo"
        style={{ height: 40, width: 40, borderRadius: '50%' }}
      />
      <Typography variant="h6" noWrap component="div" sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
        TaskManager
      </Typography>
    </Box>
  </Toolbar>
</AppBar>
      {/* Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            fontFamily: 'Poppins, Arial, sans-serif',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.08)',
                      background: 'rgba(255,255,255,0.1)',
                    },
                    fontFamily: 'Poppins, Arial, sans-serif',
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.08)',
                  
background: 'linear-gradient(90deg,rgb(79, 138, 30) 0%, #f59e42 100%)',
                  },
                  fontFamily: 'Poppins, Arial, sans-serif',
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4, md: 6 },
          ml: { xs: 0, sm: `${drawerWidth}px` },
          mt: { xs: '64px', sm: '64px' }, // AppBar height
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            minWidth: { xs: '90vw', sm: 350 },
            maxWidth: 500,
            margin: 'auto',
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            animation: 'fadeIn 1.2s',
            fontFamily: 'Poppins, Arial, sans-serif',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom color="primary" sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Welcome to TaskManager
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Use the side navigation to access different features.
          </Typography>
        </Paper>
        <style>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </Box>
    </Box>
  );
}