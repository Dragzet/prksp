import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Компонент навигационного меню
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/about">О нас</Link></li>
        <li><Link to="/contacts">Контакты</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
