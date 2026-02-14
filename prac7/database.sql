-- Создание базы данных для CRUD приложения
CREATE DATABASE crud_db;

-- Подключение к базе данных
\c crud_db;

-- Создание таблицы products (создается автоматически через Sequelize)
-- Этот скрипт для справки, Sequelize сам создаст таблицу

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    category VARCHAR(255),
    "imageUrl" VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Вставка тестовых данных
INSERT INTO products (name, description, price, quantity, category, "imageUrl") VALUES
('Ноутбук ASUS ROG', 'Игровой ноутбук с процессором Intel Core i7', 89999.99, 5, 'Электроника', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'),
('iPhone 15 Pro', 'Смартфон Apple с новым процессором A17', 119999.00, 10, 'Электроника', 'https://images.unsplash.com/photo-1678652197950-d4c0e0e8b99c?w=400'),
('Беспроводная мышь Logitech', 'Эргономичная мышь с Bluetooth', 2499.50, 25, 'Компьютерная периферия', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'),
('Механическая клавиатура', 'RGB клавиатура с синими переключателями', 5999.00, 15, 'Компьютерная периферия', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'),
('Монитор Samsung 27"', '4K монитор с частотой 144Hz', 34999.00, 8, 'Мониторы', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400');

-- Просмотр всех товаров
SELECT * FROM products;

-- Просмотр товаров определенной категории
SELECT * FROM products WHERE category = 'Электроника';

-- Обновление цены товара
UPDATE products SET price = 79999.99 WHERE id = 1;

-- Удаление товара
-- DELETE FROM products WHERE id = 5;
