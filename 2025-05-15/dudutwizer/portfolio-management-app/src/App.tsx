import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Analysis from './components/Analysis';
import Navigation from './components/Navigation';
import Login from './components/Login';
import './styles/App.css';

interface User {
  id: string;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to verify the user's token
        const token = localStorage.getItem('token');
        
        if (token) {
          // Simulate fetching user data
          setUser({
            id: '123',
            name: 'Demo User',
            email: 'demo@example.com'
          });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData: User, token: string) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            <Navigation user={user} onLogout={handleLogout} />
            <main className="content">
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/portfolio" element={<Portfolio user={user} />} />
                <Route path="/analysis" element={<Analysis user={user} />} />
              </Routes>
            </main>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
};

export default App; 