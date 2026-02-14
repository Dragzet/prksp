import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    
    if (result.success) {
      navigate('/');
    }
  };

  const demoCredentials = [
    { username: 'admin', password: 'admin123', role: 'Администратор' },
    { username: 'editor', password: 'editor123', role: 'Редактор' },
    { username: 'user', password: 'user123', role: 'Пользователь' }
  ];

  const fillDemo = (username, password) => {
    setUsername(username);
    setPassword(password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Вход в систему</h2>
        <p className="subtitle">Практическая работа №6: Аутентификация с PKCE</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="demo-section">
          <h3>Тестовые учетные записи:</h3>
          <div className="demo-credentials">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="demo-item">
                <div className="demo-info">
                  <strong>{cred.role}</strong>
                  <span>{cred.username} / {cred.password}</span>
                </div>
                <button
                  type="button"
                  onClick={() => fillDemo(cred.username, cred.password)}
                  className="btn-demo"
                  disabled={loading}
                >
                  Заполнить
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pkce-info">
          <p><strong>Используется PKCE flow:</strong></p>
          <ol>
            <li>Генерация code_verifier и code_challenge</li>
            <li>Получение кода авторизации</li>
            <li>Обмен кода на токен доступа</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
