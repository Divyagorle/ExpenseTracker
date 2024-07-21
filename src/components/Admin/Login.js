import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Default credentials for testing purposes
    const defaultCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    // Check if the entered credentials match the default credentials
    if (email === defaultCredentials.email && password === defaultCredentials.password) {
      console.log('Login successful with default credentials');
      navigate('/dashboard');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', { emailid: email, password });
      console.log('Login successful:', response.data);
      navigate('/dashboard');  // Change '/dashboard' to the actual path you want to navigate to
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <div className="card-body">
        <h5 className="card-title text-center">Login</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-4">
            <div className="col text-end">
              <a href="#!" className="text-decoration-none">Forgot password?</a>
            </div>
          </div>

          <div className="mb-4">
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </div>

          <p className="text-center">Don't have an account? <Link to='/signup'>Signup</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
