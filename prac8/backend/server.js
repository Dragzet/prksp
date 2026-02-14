const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDatabase } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));

// Базовый маршрут
app.get('/', (req, res) => {
  res.json({ 
    message: 'API для системы с ролевой моделью (RBAC)',
    version: '1.0.0',
    database: 'PostgreSQL',
    endpoints: {
      auth: '/api/auth (register, login)',
      items: '/api/items (CRUD операции)'
    }
  });
});

// Обработка ошибок 404
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;

initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
      console.log(`📍 http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Не удалось запустить сервер:', error);
    process.exit(1);
  });
