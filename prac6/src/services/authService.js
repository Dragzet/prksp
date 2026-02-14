import { generatePKCE, savePKCEVerifier, getPKCEVerifier, clearPKCEVerifier } from '../utils/pkce';

/**
 * Имитация базы данных пользователей
 */
const USERS_DB = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Администратор',
    roles: ['admin', 'user'],
    rights: ['can_view_articles', 'can_edit_articles', 'can_delete_articles', 'can_manage_users']
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    name: 'Пользователь',
    roles: ['user'],
    rights: ['can_view_articles']
  },
  {
    id: 3,
    username: 'editor',
    password: 'editor123',
    name: 'Редактор',
    roles: ['editor', 'user'],
    rights: ['can_view_articles', 'can_edit_articles']
  }
];

/**
 * Имитация хранилища кодов авторизации
 */
const authorizationCodes = new Map();

/**
 * Генерация случайного кода авторизации
 * @returns {string} код авторизации
 */
function generateAuthCode() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Генерация JWT-подобного токена (упрощенная версия)
 * @param {object} user - объект пользователя
 * @returns {string} токен
 */
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    name: user.name,
    roles: user.roles,
    rights: user.rights,
    exp: Date.now() + 3600000 // 1 час
  };
  // Кодируем Unicode строку для btoa
  const jsonString = JSON.stringify(payload);
  const utf8Bytes = new TextEncoder().encode(jsonString);
  const binaryString = String.fromCharCode(...utf8Bytes);
  return btoa(binaryString);
}

/**
 * Шаг 1: Инициация PKCE flow - генерация code_challenge
 * @returns {Promise<{challenge: string}>}
 */
export async function initiatePKCEFlow() {
  const { verifier, challenge } = await generatePKCE();
  savePKCEVerifier(verifier);
  return { challenge };
}

/**
 * Шаг 2: Получение кода авторизации
 * @param {string} username - имя пользователя
 * @param {string} password - пароль
 * @param {string} codeChallenge - code challenge из PKCE
 * @returns {Promise<{code: string, user: object} | {error: string}>}
 */
export async function authorize(username, password, codeChallenge) {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = USERS_DB.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return { error: 'Неверное имя пользователя или пароль' };
  }

  // Генерация кода авторизации
  const code = generateAuthCode();
  
  // Сохранение кода с привязкой к challenge
  authorizationCodes.set(code, {
    userId: user.id,
    codeChallenge,
    expiresAt: Date.now() + 60000 // 1 минута
  });

  // Возвращаем код и информацию о пользователе (без пароля)
  const { password: _, ...userWithoutPassword } = user;
  
  return { code, user: userWithoutPassword };
}

/**
 * Шаг 3: Обмен кода авторизации на токен доступа
 * @param {string} code - код авторизации
 * @param {string} codeVerifier - code verifier из PKCE
 * @returns {Promise<{token: string, user: object} | {error: string}>}
 */
export async function exchangeCodeForToken(code, codeVerifier) {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 300));

  const authData = authorizationCodes.get(code);
  
  if (!authData) {
    return { error: 'Недействительный код авторизации' };
  }

  if (authData.expiresAt < Date.now()) {
    authorizationCodes.delete(code);
    return { error: 'Код авторизации истек' };
  }

  // Проверка code_verifier (упрощенная)
  // В реальном приложении нужно хешировать verifier и сравнивать с challenge
  if (!codeVerifier) {
    return { error: 'Отсутствует code verifier' };
  }

  // Получение пользователя
  const user = USERS_DB.find(u => u.id === authData.userId);
  
  if (!user) {
    return { error: 'Пользователь не найден' };
  }

  // Удаление использованного кода
  authorizationCodes.delete(code);

  // Генерация токена
  const token = generateToken(user);
  
  const { password: _, ...userWithoutPassword } = user;
  
  return { token, user: userWithoutPassword };
}

/**
 * Проверка токена и получение пользователя
 * @param {string} token - JWT токен
 * @returns {object|null} объект пользователя или null
 */
export function verifyToken(token) {
  try {
    // Декодируем Unicode строку из btoa
    const binaryString = atob(token);
    const utf8Bytes = new Uint8Array(binaryString.split('').map(char => char.charCodeAt(0)));
    const jsonString = new TextDecoder().decode(utf8Bytes);
    const payload = JSON.parse(jsonString);
    
    if (payload.exp < Date.now()) {
      return null; // Токен истек
    }
    
    return {
      id: payload.id,
      username: payload.username,
      name: payload.name,
      roles: payload.roles,
      rights: payload.rights
    };
  } catch (error) {
    return null;
  }
}
