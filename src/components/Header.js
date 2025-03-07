import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Home');

  // Update active tab when the URL changes
  useEffect(() => {
    if (location.pathname === '/') setActiveTab('Home');
    else if (location.pathname === '/add') setActiveTab('Adduser');
    else if (location.pathname === '/about') setActiveTab('About');
  }, [location.pathname]);

  return (
    <div className="header">
      <p className="logo">Student Management System</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={activeTab === 'Home' ? 'active' : ''}
            onClick={() => setActiveTab('Home')}
          >
            Home
          </p>
        </Link>

        <Link to="/add">
          <p
            className={activeTab === 'Adduser' ? 'active' : ''}
            onClick={() => setActiveTab('Adduser')}
          >
            Add User
          </p>
        </Link>

        <Link to="/about">
          <p
            className={activeTab === 'About' ? 'active' : ''}
            onClick={() => setActiveTab('About')}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
}
