import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Editor from './pages/Editor';
import Admin from './pages/Admin';
import Forbidden from './pages/Forbidden';

/**
 * Компонент для редиректа на главную если пользователь уже авторизован
 */
const LoginRedirect = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <LoginForm />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Публичный маршрут - страница входа */}
          <Route path="/login" element={<LoginRedirect />} />

          {/* Страница "Доступ запрещен" */}
          <Route path="/forbidden" element={<Forbidden />} />

          {/* Защищенные маршруты - требуют аутентификации */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/articles"
            element={
              <ProtectedRoute>
                <Articles />
              </ProtectedRoute>
            }
          />

          {/* Маршруты с проверкой ролей */}
          <Route
            path="/editor"
            element={
              <RoleBasedRoute roles={['editor', 'admin']}>
                <Editor />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <RoleBasedRoute roles={['admin']}>
                <Admin />
              </RoleBasedRoute>
            }
          />

          {/* Редирект на главную для несуществующих маршрутов */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
