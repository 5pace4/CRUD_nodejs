import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const DeleteUser = async (id) => {
    if (window.confirm('Are you sure to delete this student?')) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/users/${id}`,
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          getUsers();
        }
      } catch (error) {
        toast.error('Failed to delete user!');
      }
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Id</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>
                <Link to={`/update/${item.id}`}>Edit</Link>
                <Link onClick={() => DeleteUser(item.id)}>Delete</Link>
                <Link to={`/view/${item.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
