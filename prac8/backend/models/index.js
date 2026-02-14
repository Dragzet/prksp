const sequelize = require('../config/database');
const User = require('./User');
const Item = require('./Item');

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Подключение к PostgreSQL установлено');

    // Синхронизация моделей с базой данных
    await sequelize.sync({ alter: true });
    console.log('✅ Модели синхронизированы с базой данных');
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:', error);
    throw error;
  }
};

module.exports = { sequelize, User, Item, initDatabase };
