const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware для проверки JWT токена
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Токен недействителен' });
  }
};

// Middleware для проверки роли администратора
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора' });
  }
};

// Middleware для проверки владельца ресурса или администратора
const isOwnerOrAdmin = (resourceOwnerField) => {
  return (req, res, next) => {
    const resourceOwnerId = req[resourceOwnerField];
    
    if (req.user.role === 'admin' || req.user._id.toString() === resourceOwnerId.toString()) {
      next();
    } else {
      res.status(403).json({ message: 'Доступ запрещен. Вы можете управлять только своими ресурсами' });
    }
  };
};

module.exports = { auth, isAdmin, isOwnerOrAdmin };
