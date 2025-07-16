const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const Task = require('./models/Task');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Constants
const JWT_SECRET = 'task-manager-@#';
const MONGO_URI = 'mongodb+srv://user:user@cluster0.dypnqbb.mongodb.net/TaskDB?retryWrites=true&w=majority&appName=Cluster0';
const PORT = 3000;

// ✅ MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ✅ Auth Middleware
function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
}

// ✅ Register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// ✅ Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// ✅ Protected dashboard route
app.get("/dashboard", auth, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}! You are authenticated.` });
});

// ✅ Task Routes

// Add Task
app.post('/', auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    res.status(201).send("Task added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All Tasks
app.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Task
app.put("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.send("Task updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete Task
app.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Task deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
