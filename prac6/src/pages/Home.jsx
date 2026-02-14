import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { hasRole, isAllowed } from '../utils/auth';
import './Home.css';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <h1>Практическая работа №6</h1>
          <h2>Аутентификация и авторизация в React-приложениях</h2>
        </header>

        <div className="user-info-card">
          <h3>Информация о пользователе</h3>
          <div className="user-details">
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Роли:</strong> {user.roles.join(', ')}</p>
            <p><strong>Права доступа:</strong></p>
            <ul className="rights-list">
              {user.rights.map((right, index) => (
                <li key={index}>{right}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="navigation-card">
          <h3>Доступные разделы</h3>
          <div className="nav-links">
            <Link to="/articles" className="nav-link">
              📄 Статьи
            </Link>

            {hasRole(user, ['editor', 'admin']) && (
              <Link to="/editor" className="nav-link">
                ✏️ Редактор
              </Link>
            )}

            {hasRole(user, ['admin']) && (
              <Link to="/admin" className="nav-link">
                ⚙️ Админ-панель
              </Link>
            )}
          </div>
        </div>

        <div className="features-card">
          <h3>Реализованные возможности</h3>
          <ul className="features-list">
            <li>✅ PKCE Flow (Proof Key for Code Exchange)</li>
            <li>✅ Генерация code_verifier и code_challenge</li>
            <li>✅ Трехшаговая аутентификация</li>
            <li>✅ Ролевая система доступа (admin, editor, user)</li>
            <li>✅ Система прав (rights/permissions)</li>
            <li>✅ Защищенные маршруты (ProtectedRoute)</li>
            <li>✅ Маршруты с проверкой ролей (RoleBasedRoute)</li>
            <li>✅ Хранение токена в localStorage</li>
            <li>✅ Проверка срока действия токена</li>
          </ul>
        </div>

        <div className="permissions-card">
          <h3>Ваши возможности</h3>
          <div className="permissions-grid">
            <div className={`permission-item ${isAllowed(user, ['can_view_articles']) ? 'allowed' : 'denied'}`}>
              <span className="permission-icon">{isAllowed(user, ['can_view_articles']) ? '✅' : '❌'}</span>
              <span>Просмотр статей</span>
            </div>
            <div className={`permission-item ${isAllowed(user, ['can_edit_articles']) ? 'allowed' : 'denied'}`}>
              <span className="permission-icon">{isAllowed(user, ['can_edit_articles']) ? '✅' : '❌'}</span>
              <span>Редактирование статей</span>
            </div>
            <div className={`permission-item ${isAllowed(user, ['can_delete_articles']) ? 'allowed' : 'denied'}`}>
              <span className="permission-icon">{isAllowed(user, ['can_delete_articles']) ? '✅' : '❌'}</span>
              <span>Удаление статей</span>
            </div>
            <div className={`permission-item ${isAllowed(user, ['can_manage_users']) ? 'allowed' : 'denied'}`}>
              <span className="permission-icon">{isAllowed(user, ['can_manage_users']) ? '✅' : '❌'}</span>
              <span>Управление пользователями</span>
            </div>
          </div>
        </div>

        <button onClick={logout} className="logout-button">
          Выйти из системы
        </button>
      </div>
    </div>
  );
};

export default Home;
