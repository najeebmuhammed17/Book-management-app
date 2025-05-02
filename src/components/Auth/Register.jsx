import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // added Link
import api from '../api/axios';
import '../Auth/Register.css'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('register/', formData);
      navigate('/'); // Redirect to login after success
    } catch (err) {
      setError('Registration failed. Try a different username.');
    }
  };

  return (
    <div className='reg_back container-fluid  d-flex justify-content-center align-items-center vh-100'>
          <div className=' glass-card text-white content ' style={{maxWidth:'500px',width:'100%'}}>

      <h2 className="mb-4">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Username</label>
          <input type="text" name="username" className="form-control" required onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange}/>
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" required onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>

      {/*  Login button */}
      <p className="mt-3 text-center">
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
    </div>
  );
};

export default Register;
