const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');

// Регистрация пользователя
router.post(
  '/register',
  [
    body('username').trim().isLength({ min: 3 }).withMessage('Имя пользователя должно быть минимум 3 символа'),
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 6 символов')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password, role } = req.body;

      // Проверка существования пользователя
      let user = await User.findOne({ 
        where: { 
          [require('sequelize').Op.or]: [{ email }, { username }] 
        } 
      });
      if (user) {
        return res.status(400).json({ message: 'Пользователь с таким email или именем уже существует' });
      }

      // Хеширование пароля
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Создание нового пользователя
      user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'user' // По умолчанию роль 'user'
      });

      // Создание JWT токена
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Пользователь успешно зарегистрирован',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

// Вход пользователя
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').exists().withMessage('Введите пароль')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Поиск пользователя
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Неверные учетные данные' });
      }

      // Проверка пароля
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверные учетные данные' });
      }

      // Создание JWT токена
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Вход выполнен успешно',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

module.exports = router;
