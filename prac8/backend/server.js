const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB подключена'))
.catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));

// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));

// Базовый маршрут
app.get('/', (req, res) => {
  res.json({ 
    message: 'API для системы с ролевой моделью (RBAC)',
    version: '1.0.0',
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
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
