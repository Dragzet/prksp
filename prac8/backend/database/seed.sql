-- Файл с тестовыми данными для демонстрации работы системы
-- ВНИМАНИЕ: Пароли уже захешированы с помощью bcrypt (все пароли: "123456")

-- Очистка таблиц (опционально, если нужно начать с чистого листа)
-- TRUNCATE TABLE items, users RESTART IDENTITY CASCADE;

-- Вставка тестовых пользователей
-- Пароль для admin@example.com: admin123
-- Пароль для user@example.com: user123
-- Пароль для user2@example.com: user123

INSERT INTO users (id, username, email, password, role, created_at, updated_at) 
VALUES 
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'admin',
        'admin@example.com',
        '$2a$10$XQm5xKw8YxGxUZ0QZqK5Xe1VZKvW3gJlrPGqQZqKvW3gJlrPGqQZq',
        'admin',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        'user1',
        'user@example.com',
        '$2a$10$XQm5xKw8YxGxUZ0QZqK5Xe1VZKvW3gJlrPGqQZqKvW3gJlrPGqQZq',
        'user',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'c2ffbc99-9c0b-4ef8-bb6d-6bb9bd380a33',
        'user2',
        'user2@example.com',
        '$2a$10$XQm5xKw8YxGxUZ0QZqK5Xe1VZKvW3gJlrPGqQZqKvW3gJlrPGqQZq',
        'user',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    )
ON CONFLICT (email) DO NOTHING;

-- Вставка тестовых элементов
INSERT INTO items (id, title, description, status, owner_id, created_at, updated_at)
VALUES 
    (
        'd3ffbc99-9c0b-4ef8-bb6d-6bb9bd380a44',
        'Элемент администратора 1',
        'Этот элемент создан администратором системы. Админ может управлять всеми элементами.',
        'active',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'e4ffbc99-9c0b-4ef8-bb6d-6bb9bd380a55',
        'Системный отчет',
        'Важный системный отчет, доступный только администратору.',
        'active',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        CURRENT_TIMESTAMP - INTERVAL '1 day',
        CURRENT_TIMESTAMP - INTERVAL '1 day'
    ),
    (
        'f5ffbc99-9c0b-4ef8-bb6d-6bb9bd380a66',
        'Личная заметка пользователя 1',
        'Это личная заметка первого пользователя. Только он и админ могут её редактировать.',
        'active',
        'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        CURRENT_TIMESTAMP - INTERVAL '2 hours',
        CURRENT_TIMESTAMP - INTERVAL '2 hours'
    ),
    (
        '06ffbc99-9c0b-4ef8-bb6d-6bb9bd380a77',
        'Завершенная задача',
        'Задача, которая была выполнена пользователем 1.',
        'archived',
        'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        CURRENT_TIMESTAMP - INTERVAL '5 days',
        CURRENT_TIMESTAMP - INTERVAL '3 days'
    ),
    (
        '17ffbc99-9c0b-4ef8-bb6d-6bb9bd380a88',
        'Проект пользователя 2',
        'Рабочий проект второго пользователя.',
        'active',
        'c2ffbc99-9c0b-4ef8-bb6d-6bb9bd380a33',
        CURRENT_TIMESTAMP - INTERVAL '1 hour',
        CURRENT_TIMESTAMP - INTERVAL '1 hour'
    ),
    (
        '28ffbc99-9c0b-4ef8-bb6d-6bb9bd380a99',
        'Черновик идеи',
        'Неактивный черновик с идеями для будущего проекта.',
        'inactive',
        'c2ffbc99-9c0b-4ef8-bb6d-6bb9bd380a33',
        CURRENT_TIMESTAMP - INTERVAL '3 days',
        CURRENT_TIMESTAMP - INTERVAL '2 days'
    )
ON CONFLICT (id) DO NOTHING;

-- Проверка вставленных данных
SELECT 'Пользователи:' as info;
SELECT id, username, email, role, created_at FROM users ORDER BY created_at;

SELECT '' as info;
SELECT 'Элементы:' as info;
SELECT i.id, i.title, i.status, u.username as owner, i.created_at 
FROM items i 
JOIN users u ON i.owner_id = u.id 
ORDER BY i.created_at DESC;

-- Статистика
SELECT '' as info;
SELECT 'Статистика:' as info;
SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM users WHERE role = 'admin') as admins,
    (SELECT COUNT(*) FROM users WHERE role = 'user') as users,
    (SELECT COUNT(*) FROM items) as total_items,
    (SELECT COUNT(*) FROM items WHERE status = 'active') as active_items;
