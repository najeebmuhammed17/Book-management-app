import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import '../Auth/Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });       //: Tracks what the user types.
  const [error, setError] = useState('');

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });     //Updates the username and password 
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post('token/', credentials); 
      const { access, refresh } = response.data;

      localStorage.setItem('access', access);    // Store tokens
      localStorage.setItem('refresh', refresh);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='background container-fluid  d-flex justify-content-center align-items-center vh-100'>
    <div className=' glass-card text-white content ' style={{maxWidth:'500px',width:'100%'}}>
     <h2 className="  mb-5">Login</h2>
     {error && <div className="alert alert-danger">{error}</div>}

            <div className='card-text '>
       
      <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
          <label>Username</label><br />
          <input type="text" name="username" className="form-control" value={credentials.username} onChange={handleChange} required/>
      </div>

      <div className="form-group mb-3">
          <label>Password</label> <br />
          <input type="password" name="password" className="form-control" value={credentials.password} onChange={handleChange} required />
      </div>

       <button type="submit" className="btn btn-warning w-100">Login</button>
      </form>
 
     <p className="mt-3 text-center"> Don't have an account? <Link to="/register" className='text-warning'>Register here</Link></p>
      </div>
    </div>
    </div>
  );
};

export default Login;
