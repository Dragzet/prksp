const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CREATE - Создание товара
router.post('/', productController.createProduct);

// READ - Получение всех товаров
router.get('/', productController.getAllProducts);

// READ - Получение товара по ID
router.get('/:id', productController.getProductById);

// UPDATE - Обновление товара
router.put('/:id', productController.updateProduct);

// DELETE - Удаление товара
router.delete('/:id', productController.deleteProduct);

module.exports = router;
