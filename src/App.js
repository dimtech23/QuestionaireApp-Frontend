import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthContextProvider from './context/userContext';


const App = () => {
  return (
    <Router>
      <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
        </AuthContextProvider>
    </Router>
    
  );
};

export default App;
