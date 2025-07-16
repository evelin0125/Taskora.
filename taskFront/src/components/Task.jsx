import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Box,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Checkbox
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDeadline, setEditDeadline] = useState('');
  const [notified, setNotified] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch tasks
  useEffect(() => {
    axios.get("http://localhost:3000/", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.log(err);
        alert("Failed to fetch tasks. Please login again.");
        navigate('/');
      });
  }, []);

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        alert(res.data);
        setTasks(prev => prev.filter(task => task._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Open edit dialog
  const openEditDialog = (task) => {
    setEditTask(task);
    setEditTitle(task.title);
    setEditDeadline(task.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : '');
  };

  // Update task
  const handleUpdateTask = () => {
    axios.put(`http://localhost:3000/${editTask._id}`, {
      title: editTitle,
      deadline: editDeadline,
      completed: editTask.completed || false
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setTasks(prev =>
          prev.map(task =>
            task._id === editTask._id ? { ...task, title: editTitle, deadline: editDeadline } : task
          )
        );
        setEditTask(null);
      })
      .catch((err) => console.log(err));
  };

  // Toggle completed status
  const toggleComplete = (task) => {
    const updatedStatus = !task.completed;

    axios.put(`http://localhost:3000/${task._id}`, {
      ...task,
      completed: updatedStatus,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setTasks(prev =>
          prev.map(t =>
            t._id === task._id ? { ...t, completed: updatedStatus } : t
          )
        );
      })
      .catch((err) => console.log("Failed to update completion status:", err));
  };

  // Notifications for tasks due within 1 hour
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        const timeLeft = new Date(task.deadline) - now;
        if (!task.completed && timeLeft > 0 && timeLeft < 3600000 && !notified[task._id]) {
          alert(`⏰ Task "${task.title}" is due within 1 hour!`);
          setNotified(prev => ({ ...prev, [task._id]: true }));
        }
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [tasks, notified]);

  return (
    <Box
      sx={{
        fontFamily: 'Poppins, Arial, sans-serif',
        p: { xs: 2, md: 4 },
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)',
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
          bgcolor: 'rgba(255,255,255,0.75)',
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          color="primary"
          sx={{ fontWeight: 600 }}
        >
          Your Tasks
        </Typography>

        <Grid container spacing={2}>
          {tasks.map(task => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.95)',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>{task.title}</Typography>

                <Box display="flex" alignItems="center" gap={1}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    color="success"
                  />
                  <Typography
                    variant="body2"
                    color={task.completed ? 'green' : 'text.secondary'}
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      fontWeight: task.completed ? 500 : 400,
                    }}
                  >
                    {task.completed ? 'Completed' : 'Not Completed'}
                  </Typography>
                </Box>

                {task.deadline && (
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Due: {new Date(task.deadline).toLocaleString()}
                  </Typography>
                )}

                <Box mt={2} display="flex" justifyContent="space-between" gap={1}>
                  <Button variant="contained" color='success' size="small" onClick={() => openEditDialog(task)}>Update</Button>
                  <Button variant="contained" color="error" size="small" onClick={() => deleteTask(task._id)}>Delete</Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Dialog open={!!editTask} onClose={() => setEditTask(null)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Title"
              variant="outlined"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              fullWidth
              sx={{ my: 1 }}
            />
            <TextField
              label="Deadline"
              variant="outlined"
              type="datetime-local"
              value={editDeadline}
              onChange={e => setEditDeadline(e.target.value)}
              fullWidth
              sx={{ my: 1 }}
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditTask(null)} color="secondary">Cancel</Button>
            <Button onClick={handleUpdateTask} variant="contained" color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
