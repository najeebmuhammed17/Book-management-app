import React from 'react';
import { isAdmin } from '../../utils/auth';
import BookList from './BookList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  return (
    <div className='dash-back'>
    <div className="container ">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 style={{ color: 'white' }}>Dashboard</h2>
      <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p style={{ color: 'white' }}>Welcome, {isAdmin() ? 'Admin' : 'User'}!</p>

      <BookList />
    </div>
    </div>
  );
};

export default Dashboard;
