import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Editor.css';

const Editor = () => {
  const { user } = useAuth();

  return (
    <div className="editor-container">
      <div className="editor-content">
        <header className="editor-header">
          <h1>✏️ Редактор</h1>
          <p>Раздел для редакторов и администраторов</p>
        </header>

        <div className="role-info">
          <h3>Доступ разрешен для ролей:</h3>
          <div className="roles">
            <span className="role-badge">editor</span>
            <span className="role-badge">admin</span>
          </div>
          <p>Ваша роль: <strong>{user.roles.join(', ')}</strong></p>
        </div>

        <div className="editor-card">
          <h2>Редактор статей</h2>
          <p>Этот раздел доступен только пользователям с ролями "editor" или "admin".</p>
          <p>Здесь вы можете создавать и редактировать статьи.</p>
          
          <div className="editor-area">
            <label>Название статьи:</label>
            <input type="text" placeholder="Введите название..." />
            
            <label>Содержание:</label>
            <textarea rows="8" placeholder="Введите содержание статьи..."></textarea>
            
            <button className="btn-save">Сохранить статью</button>
          </div>
        </div>

        <div className="info-card">
          <h3>ℹ️ Информация</h3>
          <p>Этот маршрут защищен компонентом <code>RoleBasedRoute</code>, который проверяет наличие необходимых ролей у пользователя.</p>
          <p>Если попытается зайти пользователь без нужной роли, он будет перенаправлен на страницу "Доступ запрещен".</p>
        </div>
      </div>
    </div>
  );
};

export default Editor;
