// src/components/AddUserForm.js
import React, { useState } from 'react';
import api from '../../services/api';

const AddWorkerForm = ({ onWorkerAdded }) => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phoneNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/workers', formData);
      onWorkerAdded(response.data);
      setFormData({ fname: '', lname: '', email: '', phone_number: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Add New Worker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          value={formData.fname}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lname"
          placeholder="lname"
          value={formData.lname}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Worker</button>
      </form>
    </div>
  );
};

export default AddWorkerForm;
