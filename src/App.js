import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from './components/Admin/Login';
import Signup from './components/Admin/Signup';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './components/Sidebar';
import Expense from './components/Expense';
import Category from './components/Category';

 
function App() {
  return (
  
    <Router>
     
      <Header/>
      
      <Sidebar/>
      <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/sidebar" element={<Sidebar/>} />
          <Route path="/expenses" element={<Expense/>} />
          <Route path="/category" element={<Category/>} />
       
       
      </Routes>
          
          
     
    </Router>
  );
}

export default App;
