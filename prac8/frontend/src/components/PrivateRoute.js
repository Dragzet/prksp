import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!isAdmin()) {
    return (
      <div className="access-denied">
        <h2>Доступ запрещён</h2>
        <p>У вас нет прав администратора для просмотра этой страницы.</p>
      </div>
    );
  }

  return children;
};
