import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  initiatePKCEFlow, 
  authorize, 
  exchangeCodeForToken,
  verifyToken 
} from '../services/authService';
import {
  saveToken,
  getToken,
  saveUser,
  getUser,
  logout as logoutUtil
} from '../utils/auth';
import { getPKCEVerifier, clearPKCEVerifier } from '../utils/pkce';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Проверка существующего токена при загрузке
  useEffect(() => {
    const token = getToken();
    if (token) {
      const userData = verifyToken(token);
      if (userData) {
        setUser(userData);
      } else {
        logoutUtil();
      }
    }
    setLoading(false);
  }, []);

  /**
   * Вход в систему с использованием PKCE flow
   * @param {string} username - имя пользователя
   * @param {string} password - пароль
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const login = async (username, password) => {
    setError(null);
    setLoading(true);

    try {
      // Шаг 1: Генерация PKCE challenge
      const { challenge } = await initiatePKCEFlow();

      // Шаг 2: Получение кода авторизации
      const authResult = await authorize(username, password, challenge);

      if (authResult.error) {
        setError(authResult.error);
        setLoading(false);
        return { success: false, error: authResult.error };
      }

      // Шаг 3: Обмен кода на токен
      const verifier = getPKCEVerifier();
      const tokenResult = await exchangeCodeForToken(authResult.code, verifier);

      if (tokenResult.error) {
        setError(tokenResult.error);
        setLoading(false);
        clearPKCEVerifier();
        return { success: false, error: tokenResult.error };
      }

      // Сохранение токена и пользователя
      saveToken(tokenResult.token);
      saveUser(tokenResult.user);
      setUser(tokenResult.user);
      clearPKCEVerifier();
      setLoading(false);

      return { success: true };
    } catch (err) {
      console.error('Ошибка при входе:', err);
      const errorMsg = err.message || 'Произошла ошибка при входе в систему';
      setError(errorMsg);
      setLoading(false);
      clearPKCEVerifier();
      return { success: false, error: errorMsg };
    }
  };

  /**
   * Выход из системы
   */
  const logout = () => {
    logoutUtil();
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
