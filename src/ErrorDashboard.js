import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ErrorDashboard.css"

const ErrorDashboard = () => {
  const [items, setItems] = useState([]);
  const [names, setNames] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/logs/get-all-logs/${selectedName}`);
        setItems(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedName) {
      fetchData();
    }
  }, [selectedName]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/list-users', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setNames(response.data.data);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };

    fetchNames();
  }, []);

  const authToken = "bc4db8c049893fab4b577d57a38a4774:e88cc72c49cc663b6c6aac182ab1e23844e1e892bc5cd4ad9d40db54e087bf1e3445537072d7a3754616d71d0196e63e05b743b6cfef04525597094d1a826d974c86a3d988ff641e22d9a6627410e1f4b7a70a0aa4f3d891c473ac9889a3a467a5ac834a6256a4ed97243d1c2ef69cd1839b5309b9:195b2e5a3a3909613c2894e2faee2696"

  return (
    <div className="error-dashboard">
      <h1>Error Tracking Dashboard</h1>

      <select className="name-select" onChange={(e) => setSelectedName(e.target.value)}>
        <option value="">Select a name...</option>
        {names.map(name => (
          <option key={name._id} value={name._id}>{name.name}</option>
        ))}
      </select>

      {selectedName && (
        <div className="selected-name">
          <h2>Selected Name:</h2>
          <p>
            {names.find(name => name._id === selectedName)?.name || 'Unknown'}
          </p>
        </div>
      )}
      <table className="error-table">
        <thead>
          <tr>
            <th>UTC TIME</th>
            <th>LOCAL TIME</th>
            <th>URL</th>
            <th>Method</th>
            <th>Status Message</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.created_at}</td>
              <td>{new Date(item.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
              <td>{item.request_url}</td>
              <td>{item.method}</td>
              <td>{item.status_message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ErrorDashboard;
