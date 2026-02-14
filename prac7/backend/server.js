const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);

// Базовый маршрут
app.get('/', (req, res) => {
  res.json({ 
    message: 'CRUD API с Express и PostgreSQL',
    endpoints: {
      'GET /api/products': 'Получить все товары',
      'GET /api/products/:id': 'Получить товар по ID',
      'POST /api/products': 'Создать новый товар',
      'PUT /api/products/:id': 'Обновить товар',
      'DELETE /api/products/:id': 'Удалить товар'
    }
  });
});

// Подключение к базе данных и запуск сервера
const startServer = async () => {
  try {
    // Проверка подключения к БД
    await sequelize.authenticate();
    console.log('✓ Подключение к PostgreSQL установлено');

    // Синхронизация моделей с БД
    await sequelize.sync({ alter: true });
    console.log('✓ Модели синхронизированы с базой данных');

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`✓ Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка запуска сервера:', error);
    process.exit(1);
  }
};

startServer();
