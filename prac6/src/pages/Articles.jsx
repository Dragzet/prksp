import React from 'react';
import { useAuth } from '../context/AuthContext';
import { isAllowed } from '../utils/auth';
import './Articles.css';

const Articles = () => {
  const { user } = useAuth();

  const articles = [
    { id: 1, title: 'Введение в React', content: 'React - это библиотека JavaScript для создания пользовательских интерфейсов.' },
    { id: 2, title: 'Аутентификация в веб-приложениях', content: 'Аутентификация - это процесс проверки учетных данных пользователя.' },
    { id: 3, title: 'PKCE Flow объяснение', content: 'PKCE (Proof Key for Code Exchange) - это расширение OAuth 2.0 для повышения безопасности.' },
  ];

  return (
    <div className="articles-container">
      <div className="articles-content">
        <header className="articles-header">
          <h1>📄 Статьи</h1>
          <p>Просмотр доступных материалов</p>
        </header>

        <div className="permissions-info">
          <h3>Ваши права доступа:</h3>
          <ul>
            <li className={isAllowed(user, ['can_view_articles']) ? 'has-permission' : 'no-permission'}>
              {isAllowed(user, ['can_view_articles']) ? '✅' : '❌'} Просмотр статей
            </li>
            <li className={isAllowed(user, ['can_edit_articles']) ? 'has-permission' : 'no-permission'}>
              {isAllowed(user, ['can_edit_articles']) ? '✅' : '❌'} Редактирование статей
            </li>
            <li className={isAllowed(user, ['can_delete_articles']) ? 'has-permission' : 'no-permission'}>
              {isAllowed(user, ['can_delete_articles']) ? '✅' : '❌'} Удаление статей
            </li>
          </ul>
        </div>

        <div className="articles-list">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              <div className="article-actions">
                {isAllowed(user, ['can_edit_articles']) && (
                  <button className="btn-edit">Редактировать</button>
                )}
                {isAllowed(user, ['can_delete_articles']) && (
                  <button className="btn-delete">Удалить</button>
                )}
                {!isAllowed(user, ['can_edit_articles']) && !isAllowed(user, ['can_delete_articles']) && (
                  <span className="read-only">Только просмотр</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
