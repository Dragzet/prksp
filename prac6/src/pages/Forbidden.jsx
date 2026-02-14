import React from 'react';
import { Link } from 'react-router-dom';
import './Forbidden.css';

const Forbidden = () => {
  return (
    <div className="forbidden-container">
      <div className="forbidden-content">
        <div className="forbidden-icon">🚫</div>
        <h1>403</h1>
        <h2>Доступ запрещен</h2>
        <p>У вас нет прав для доступа к этой странице.</p>
        <p className="forbidden-details">
          Этот раздел требует специальных прав доступа или роли, которых у вас нет.
        </p>
        <Link to="/" className="btn-home">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
