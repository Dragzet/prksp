import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { itemsAPI } from '../api/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active'
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemsAPI.getAll();
      setItems(response.data.items);
      setError('');
    } catch (err) {
      setError('Ошибка при загрузке данных');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingItem) {
        await itemsAPI.update(editingItem._id, formData);
      } else {
        await itemsAPI.create(formData);
      }
      
      setFormData({ title: '', description: '', status: 'active' });
      setShowForm(false);
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при сохранении');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      status: item.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      try {
        await itemsAPI.delete(id);
        fetchItems();
      } catch (err) {
        setError(err.response?.data?.message || 'Ошибка при удалении');
      }
    }
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({ title: '', description: '', status: 'active' });
  };

  const canEdit = (item) => {
    return isAdmin() || item.owner._id === user.id;
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Панель управления</h1>
        <p className="user-greeting">
          Добро пожаловать, <strong>{user.username}</strong>!
          <span className={`role-badge ${user.role}`}>
            {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
          </span>
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-actions">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Отменить' : '+ Создать элемент'}
        </button>
      </div>

      {showForm && (
        <div className="item-form-container">
          <h2>{editingItem ? 'Редактировать элемент' : 'Новый элемент'}</h2>
          <form onSubmit={handleSubmit} className="item-form">
            <div className="form-group">
              <label htmlFor="title">Заголовок</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Введите заголовок"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Описание</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Введите описание"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Статус</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="active">Активный</option>
                <option value="inactive">Неактивный</option>
                <option value="archived">Архивный</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                {editingItem ? 'Сохранить изменения' : 'Создать'}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn-secondary"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="items-container">
        <h2>
          {isAdmin() ? 'Все элементы в системе' : 'Мои элементы'}
          <span className="items-count">({items.length})</span>
        </h2>
        
        {items.length === 0 ? (
          <div className="no-items">
            <p>Пока нет элементов. Создайте первый!</p>
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item._id} className="item-card">
                <div className="item-header">
                  <h3>{item.title}</h3>
                  <span className={`status-badge ${item.status}`}>
                    {item.status === 'active' ? 'Активный' :
                     item.status === 'inactive' ? 'Неактивный' : 'Архивный'}
                  </span>
                </div>
                
                <p className="item-description">{item.description}</p>
                
                <div className="item-meta">
                  <span className="item-owner">
                    👤 {item.owner.username}
                    {item.owner.role === 'admin' && (
                      <span className="mini-badge">admin</span>
                    )}
                  </span>
                  <span className="item-date">
                    {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>

                {canEdit(item) && (
                  <div className="item-actions">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-edit"
                    >
                      ✏️ Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-delete"
                    >
                      🗑️ Удалить
                    </button>
                  </div>
                )}

                {!canEdit(item) && (
                  <div className="item-locked">
                    🔒 Только для просмотра
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
