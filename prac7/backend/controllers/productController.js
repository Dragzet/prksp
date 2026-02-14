const Product = require('../models/Product');

// CREATE - Создание нового товара
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, category, imageUrl } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ 
        error: 'Название и цена обязательны' 
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      quantity: quantity || 0,
      category,
      imageUrl
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Ошибка создания товара:', error);
    res.status(500).json({ 
      error: 'Ошибка при создании товара',
      details: error.message 
    });
  }
};

// READ - Получение всех товаров
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    console.error('Ошибка получения товаров:', error);
    res.status(500).json({ 
      error: 'Ошибка при получении товаров',
      details: error.message 
    });
  }
};

// READ - Получение товара по ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ 
        error: 'Товар не найден' 
      });
    }

    res.json(product);
  } catch (error) {
    console.error('Ошибка получения товара:', error);
    res.status(500).json({ 
      error: 'Ошибка при получении товара',
      details: error.message 
    });
  }
};

// UPDATE - Обновление товара
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, category, imageUrl } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ 
        error: 'Товар не найден' 
      });
    }

    await product.update({
      name: name !== undefined ? name : product.name,
      description: description !== undefined ? description : product.description,
      price: price !== undefined ? price : product.price,
      quantity: quantity !== undefined ? quantity : product.quantity,
      category: category !== undefined ? category : product.category,
      imageUrl: imageUrl !== undefined ? imageUrl : product.imageUrl
    });

    res.json(product);
  } catch (error) {
    console.error('Ошибка обновления товара:', error);
    res.status(500).json({ 
      error: 'Ошибка при обновлении товара',
      details: error.message 
    });
  }
};

// DELETE - Удаление товара
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ 
        error: 'Товар не найден' 
      });
    }

    await product.destroy();
    res.json({ 
      message: 'Товар успешно удален',
      id: id 
    });
  } catch (error) {
    console.error('Ошибка удаления товара:', error);
    res.status(500).json({ 
      error: 'Ошибка при удалении товара',
      details: error.message 
    });
  }
};
