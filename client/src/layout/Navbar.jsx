// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import react from '../assets/react.svg';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  console.log(user)

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className='container'>
      <Link to='/'><img src={react} alt="React Logo" /></Link>
      <div className='left-part'>
        {token && user ? (
          <>
            <span className='user-info'>Hello, {user}</span>
            <button onClick={handleLogout} className='logout-button'>LogOut</button>
          </>
        ) : (
          <>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
