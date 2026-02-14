const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Item = require('../models/Item');
const { auth, isAdmin } = require('../middleware/auth');

// Получить все элементы (админ видит все, пользователь - только свои)
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    
    // Если пользователь не администратор, показываем только его элементы
    if (req.user.role !== 'admin') {
      query.owner = req.user._id;
    }

    const items = await Item.find(query)
      .populate('owner', 'username email role')
      .sort({ createdAt: -1 });

    res.json({
      items,
      count: items.length,
      userRole: req.user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить элемент по ID
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('owner', 'username email role');
    
    if (!item) {
      return res.status(404).json({ message: 'Элемент не найден' });
    }

    // Проверка прав доступа (владелец или администратор)
    if (req.user.role !== 'admin' && item.owner._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Создать новый элемент (доступно всем авторизованным пользователям)
router.post(
  '/',
  [
    auth,
    body('title').trim().notEmpty().withMessage('Заголовок обязателен'),
    body('description').trim().notEmpty().withMessage('Описание обязательно')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, status } = req.body;

      const item = new Item({
        title,
        description,
        status: status || 'active',
        owner: req.user._id
      });

      await item.save();
      await item.populate('owner', 'username email role');

      res.status(201).json({
        message: 'Элемент успешно создан',
        item
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

// Обновить элемент (владелец или администратор)
router.put(
  '/:id',
  [
    auth,
    body('title').optional().trim().notEmpty().withMessage('Заголовок не может быть пустым'),
    body('description').optional().trim().notEmpty().withMessage('Описание не может быть пустым')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const item = await Item.findById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ message: 'Элемент не найден' });
      }

      // Проверка прав доступа (владелец или администратор)
      if (req.user.role !== 'admin' && item.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Доступ запрещен. Вы можете редактировать только свои элементы' });
      }

      const { title, description, status } = req.body;

      if (title) item.title = title;
      if (description) item.description = description;
      if (status) item.status = status;

      await item.save();
      await item.populate('owner', 'username email role');

      res.json({
        message: 'Элемент успешно обновлен',
        item
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

// Удалить элемент (владелец или администратор)
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Элемент не найден' });
    }

    // Проверка прав доступа (владелец или администратор)
    if (req.user.role !== 'admin' && item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен. Вы можете удалять только свои элементы' });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: 'Элемент успешно удален' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить всех пользователей (только для администратора)
router.get('/admin/all-items', [auth, isAdmin], async (req, res) => {
  try {
    const items = await Item.find()
      .populate('owner', 'username email role')
      .sort({ createdAt: -1 });

    res.json({
      items,
      count: items.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
