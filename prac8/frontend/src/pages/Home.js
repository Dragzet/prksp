import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Система управления с ролевой моделью</h1>
        <p className="subtitle">
          Практическая работа №8 - Реализация RBAC (Role-Based Access Control)
        </p>
        
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Пользователь</h3>
            <ul>
              <li>Создание своих элементов</li>
              <li>Редактирование своих данных</li>
              <li>Удаление своих записей</li>
              <li>Просмотр только своих элементов</li>
            </ul>
          </div>

          <div className="feature-card admin">
            <div className="feature-icon">👑</div>
            <h3>Администратор</h3>
            <ul>
              <li>Полный доступ ко всем элементам</li>
              <li>Управление данными всех пользователей</li>
              <li>Создание, редактирование, удаление</li>
              <li>Просмотр всей информации в системе</li>
            </ul>
          </div>
        </div>

        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary btn-large">
            Начать работу
          </Link>
          <Link to="/login" className="btn btn-secondary btn-large">
            Войти
          </Link>
        </div>

        <div className="tech-stack">
          <h3>Технологии:</h3>
          <div className="tech-badges">
            <span className="tech-badge">React</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">Express</span>
            <span className="tech-badge">MongoDB</span>
            <span className="tech-badge">JWT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
