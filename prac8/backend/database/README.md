# База данных PostgreSQL

Этот каталог содержит SQL скрипты для настройки базы данных.

## Файлы

- **schema.sql** - Создание таблиц и схемы базы данных
- **seed.sql** - Тестовые данные для демонстрации

## Автоматическая настройка (рекомендуется)

Приложение использует **Sequelize ORM**, который автоматически создает таблицы при первом запуске. Просто:

1. Создайте пустую базу данных:
```sql
CREATE DATABASE prac8_rbac;
```

2. Настройте `.env` файл
3. Запустите `npm start`

Sequelize сам создаст все необходимые таблицы!

## Ручная настройка (опционально)

Если хотите настроить БД вручную:

### 1. Создайте базу данных

```bash
# Войдите в PostgreSQL
psql -U postgres

# Создайте базу данных
CREATE DATABASE prac8_rbac;

# Подключитесь к базе
\c prac8_rbac;
```

### 2. Примените схему

```bash
# Из командной строки
psql -U postgres -d prac8_rbac -f schema.sql

# Или из psql
\c prac8_rbac
\i schema.sql
```

### 3. Загрузите тестовые данные (опционально)

```bash
psql -U postgres -d prac8_rbac -f seed.sql

# Или из psql
\i seed.sql
```

## Тестовые пользователи

После загрузки seed.sql будут доступны:

### Администратор
- **Email:** admin@example.com
- **Пароль:** admin123
- **Права:** Полный доступ ко всем данным

### Пользователь 1
- **Email:** user@example.com
- **Пароль:** user123
- **Права:** Доступ только к своим данным

### Пользователь 2
- **Email:** user2@example.com
- **Пароль:** user123
- **Права:** Доступ только к своим данным

## Структура таблиц

### Таблица `users`
```sql
- id (UUID, PRIMARY KEY)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, хешированный)
- role (ENUM: 'admin', 'user')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Таблица `items`
```sql
- id (UUID, PRIMARY KEY)
- title (VARCHAR)
- description (TEXT)
- status (ENUM: 'active', 'inactive', 'archived')
- owner_id (UUID, FOREIGN KEY -> users.id)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Полезные команды PostgreSQL

### Подключение
```bash
psql -U postgres -d prac8_rbac
```

### Просмотр таблиц
```sql
\dt
```

### Описание таблицы
```sql
\d users
\d items
```

### Просмотр данных
```sql
SELECT * FROM users;
SELECT * FROM items;
```

### Очистка таблиц
```sql
TRUNCATE TABLE items, users RESTART IDENTITY CASCADE;
```

### Удаление базы данных
```sql
DROP DATABASE prac8_rbac;
```

## Резервное копирование

### Создать бэкап
```bash
pg_dump -U postgres prac8_rbac > backup.sql
```

### Восстановить из бэкапа
```bash
psql -U postgres -d prac8_rbac < backup.sql
```

## Примечания

- UUID генерируются автоматически
- Триггеры обновляют `updated_at` при изменении записей
- Индексы созданы для оптимизации запросов
- Внешние ключи обеспечивают целостность данных
- CASCADE удаляет элементы при удалении пользователя
