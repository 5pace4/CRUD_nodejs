import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  id: '',
  name: '',
  email: '',
  contact: '',
};

export default function AddEdit() {
  const [state, setState] = useState(initialState);
  const { id, name, email, contact } = state;
  const navigate = useNavigate();
  const { id: userId } = useParams(); // Extract 'id' from URL params

  useEffect(() => {
    if (userId) {
      getSingleUser(userId); 
    }
  }, [userId]);

  const getSingleUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      if (response.status === 200) {
        setState(response.data); 
      }
    } catch (error) {
      toast.error('Failed to fetch user data');
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !name || !email || !contact) {
      toast.error('Please provide valid input values');
      return;
    }

    if (userId) {
      // Update user if userId exists
      try {
        const response = await axios.patch(
          `http://localhost:5000/users/${userId}`,
          state,
        );
        if (response.status === 200) {
          toast.success('User updated successfully!');
          navigate('/'); // Redirect after successful update
        }
      } catch (error) {
        toast.error('Failed to update user');
        console.error('Error updating user:', error);
      }
    } else {
      // Add new user if no userId exists
      try {
        const response = await axios.post('http://localhost:5000/users', state);
        if (response.status === 201) {
          toast.success('User added successfully!');
          navigate('/'); // Redirect after adding user
        }
      } catch (error) {
        toast.error('Failed to add user');
        console.error('Error adding user:', error);
      }
    }
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        id="form-input"
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          textAlign: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <div id="input-field">
          <label htmlFor="id">Student ID: </label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={handleInputChange}
            placeholder="Enter your Student ID here"
            disabled={userId} // Disable if in edit mode
          />
        </div>
        <div id="input-field">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter your name here"
          />
        </div>
        <div id="input-field">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email here"
          />
        </div>
        <div id="input-field">
          <label htmlFor="contact">Contact: </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={contact}
            onChange={handleInputChange}
            placeholder="Enter your contact here"
          />
        </div>
        <input type="submit" value={userId ? 'Update' : 'Add'} />
      </form>
    </div>
  );
}
