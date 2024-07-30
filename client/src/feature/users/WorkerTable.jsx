// src/components/UserTable.js
import React from 'react';

const WorkerTable = ({ workers }) => {
  return (
    <div>
      <h2>Worker List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {workers.map(worker => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.fname}</td>
              <td>{worker.lname}</td>
              <td>{worker.email}</td>
              <td>{worker.phone_number}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerTable;
