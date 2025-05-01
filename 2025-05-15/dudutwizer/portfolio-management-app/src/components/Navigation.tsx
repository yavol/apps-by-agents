import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

interface User {
  id: string;
  name: string;
  email: string;
}

interface NavigationProps {
  user: User;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  return (
    <nav className="navigation">
      <div className="logo">
        <h1>Portfolio App</h1>
        <p className="subtitle">AI-Generated</p>
      </div>
      
      <ul className="nav-links">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/analysis">Analysis</Link>
        </li>
      </ul>
      
      <div className="user-info">
        <span className="username">{user.name}</span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 