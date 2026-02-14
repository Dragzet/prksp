import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Точка входа в приложение
 * Рендерим корневой компонент App в DOM элемент с id="root"
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
