import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === '123@') {
      setError('');
      navigate('/AdminDash');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-secondary text-white text-center py-4">
        <h2>Secure Task Management System</h2>
      </header>

      {/* Admin Login Section */}
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="bg-light p-4 rounded shadow-sm" style={{ width: '40%' }}>
          <h2 className="text-center text-decoration-underline mb-4">Admin Login</h2>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-danger mb-3">{error}</p>}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="btn btn-secondary w-100"
            style={{ fontSize: '16px' }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
