import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();

  const users = [
    { id: 1, name: 'Администратор', username: 'admin', roles: ['admin', 'user'] },
    { id: 2, name: 'Пользователь', username: 'user', roles: ['user'] },
    { id: 3, name: 'Редактор', username: 'editor', roles: ['editor', 'user'] },
  ];

  return (
    <div className="admin-container">
      <div className="admin-content">
        <header className="admin-header">
          <h1>⚙️ Админ-панель</h1>
          <p>Раздел только для администраторов</p>
        </header>

        <div className="role-info">
          <h3>Доступ разрешен для ролей:</h3>
          <div className="roles">
            <span className="role-badge admin">admin</span>
          </div>
          <p>Ваша роль: <strong>{user.roles.join(', ')}</strong></p>
        </div>

        <div className="admin-card">
          <h2>Управление пользователями</h2>
          <p>Этот раздел доступен только администраторам системы.</p>
          
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Имя</th>
                  <th>Username</th>
                  <th>Роли</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.username}</td>
                    <td>
                      <div className="user-roles">
                        {u.roles.map((role, idx) => (
                          <span key={idx} className="role-tag">{role}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-table-edit">Изменить</button>
                        <button className="btn-table-delete">Удалить</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div className="stat-label">Всего пользователей</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">1</div>
            <div className="stat-label">Администраторов</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">1</div>
            <div className="stat-label">Редакторов</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div className="stat-label">Статей</div>
          </div>
        </div>

        <div className="info-card">
          <h3>🔒 Защита маршрута</h3>
          <p>Этот маршрут защищен компонентом <code>RoleBasedRoute</code> с проверкой роли <code>admin</code>.</p>
          <p>Попытка доступа пользователей без роли "admin" будет перенаправлена на страницу "Доступ запрещен".</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
