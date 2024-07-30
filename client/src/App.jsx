import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserManagement from './feature/users/UserManagement';
import Welcome from './feature/auth/Welcome';
import Login from './feature/auth/Login';
import Register from './feature/auth/Register';
import Navbar from './layout/Navbar'
import './index.css';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </>
  );
}

export default App;
