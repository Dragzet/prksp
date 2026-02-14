/**
 * Проверка, аутентифицирован ли пользователь
 * @param {object} user - объект пользователя
 * @returns {boolean} true если пользователь аутентифицирован
 */
export const isAuthenticated = user => !!user;

/**
 * Проверка наличия у пользователя необходимых прав
 * @param {object} user - объект пользователя
 * @param {string[]} rights - массив необходимых прав
 * @returns {boolean} true если у пользователя есть хотя бы одно из прав
 */
export const isAllowed = (user, rights) =>
  rights.some(right => user.rights.includes(right));

/**
 * Проверка наличия у пользователя необходимой роли
 * @param {object} user - объект пользователя
 * @param {string[]} roles - массив необходимых ролей
 * @returns {boolean} true если у пользователя есть хотя бы одна из ролей
 */
export const hasRole = (user, roles) =>
  roles.some(role => user.roles.includes(role));

/**
 * Сохранение токена в localStorage
 * @param {string} token - JWT токен
 */
export const saveToken = (token) => {
  localStorage.setItem('auth_token', token);
};

/**
 * Получение токена из localStorage
 * @returns {string|null} токен или null
 */
export const getToken = () => {
  return localStorage.getItem('auth_token');
};

/**
 * Удаление токена из localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('auth_token');
};

/**
 * Сохранение пользователя в localStorage
 * @param {object} user - объект пользователя
 */
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Получение пользователя из localStorage
 * @returns {object|null} объект пользователя или null
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Удаление пользователя из localStorage
 */
export const removeUser = () => {
  localStorage.removeItem('user');
};

/**
 * Выход из системы (удаление всех данных)
 */
export const logout = () => {
  removeToken();
  removeUser();
};
