import React from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="card mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <div className="card-body">
        <h5 className="card-title text-center">Login</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="form1Example1" className="form-label">Email address</label>
            <input type="email" id="form1Example1" className="form-control" />
          </div>

          <div className="mb-4">
            <label htmlFor="form1Example2" className="form-label">Password</label>
            <input type="password" id="form1Example2" className="form-control" />
          </div>

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
