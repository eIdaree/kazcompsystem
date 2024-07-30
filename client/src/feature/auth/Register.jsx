import React, { useState } from 'react';
import api from '../../services/api';
import '../../index.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    password: '',
    phone_number: '',
    email: '',
    roles: ['User'], 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/register', formData);
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fname" placeholder="First Name" onChange={handleChange} required />
          <input type="text" name="lname" placeholder="Last Name" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
