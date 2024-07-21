import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const AuthenticatedLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div>
        {children}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;