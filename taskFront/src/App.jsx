import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddTask from './components/AddTask';
import Task from './components/Task';
import NavigatePage from './components/NavigatePage';
import Calender from './components/Calender';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  // Responsive style for main container
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    minHeight: '100vh',
    minWidth: '100vw',
    overflow: 'auto',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyle}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/navigate" element={<NavigatePage />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/task" element={<Task />} />
          <Route path="/calender" element={<Calender />} />
          {/* You can add more routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
