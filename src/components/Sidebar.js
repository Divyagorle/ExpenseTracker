import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link className="active" to="/">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/category">Categories</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Sidebar;
