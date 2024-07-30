// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import WorkerTable from './WorkerTable';
import AddWorkerForm from './AddWorkerForm';

const UserManagement = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await api.get('/workers');
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleWorkerAdded = (newUser) => {
    setWorkers([...users, newUser]);
  };

  return (
    <div>
      <h1>User Management</h1>
      <AddWorkerForm onWorkerAdded={handleWorkerAdded} />
      <WorkerTable workers={workers} />
    </div>
  );
};

export default UserManagement;
