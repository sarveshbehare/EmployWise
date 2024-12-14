import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditUser() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Could not fetch user details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Could not update user');
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          className="form-control"
          placeholder="First Name"
          value={user.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          className="form-control"
          placeholder="Last Name"
          value={user.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Update User</button>
        <button 
          type="button" 
          className="btn btn-danger" 
          onClick={() => navigate('/users')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditUser;