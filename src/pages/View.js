import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './View.css';

export default function View() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      console.log('Fetched User Data:', response.data); // Debugging
      if (response.status === 200) {
        setUser(
          Array.isArray(response.data) ? response.data[0] : response.data,
        );
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <div className="card">
        <div className="card-header">
          <h3>Student Contact Details</h3>
        </div>
        <div className="container">
          {user ? (
            <>
              <span>
                <strong>ID:</strong> {user.id}
              </span>{' '}
              <br />
              <span>
                <strong>Name:</strong> {user.name}
              </span>{' '}
              <br />
              <span>
                <strong>Email:</strong> {user.email}
              </span>{' '}
              <br />
              <span>
                <strong>Contact:</strong> {user.contact}
              </span>
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <div style={{ marginTop: '10px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
