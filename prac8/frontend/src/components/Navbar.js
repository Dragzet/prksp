import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          RBAC System
        </Link>
        
        <div className="navbar-menu">
          {isAuthenticated() ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                Панель управления
              </Link>
              
              <div className="navbar-user">
                <span className="user-info">
                  {user.username} 
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                  </span>
                </span>
                <button onClick={handleLogout} className="btn btn-logout">
                  Выход
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Вход
              </Link>
              <Link to="/register" className="navbar-link">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
