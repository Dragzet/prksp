import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Страница 404 - не найдено
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
