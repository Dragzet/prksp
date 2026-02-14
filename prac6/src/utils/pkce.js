/**
 * Генерация случайной строки для PKCE
 * @param {number} length - длина строки
 * @returns {string} случайная строка
 */
function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  // Проверка доступности crypto API
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  }
  
  // Fallback для старых браузеров
  let result = '';
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}

/**
 * Хеширование строки с использованием SHA-256
 * @param {string} plain - исходная строка
 * @returns {Promise<string>} хешированная строка в base64url формате
 */
async function sha256(plain) {
  // Проверка доступности Web Crypto API
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      const hash = await crypto.subtle.digest('SHA-256', data);
      return base64urlencode(hash);
    } catch (error) {
      console.warn('Web Crypto API недоступен, используется упрощенное хеширование', error);
    }
  }
  
  // Fallback - просто base64 кодирование (только для демо!)
  // Кодируем Unicode строку для btoa
  const utf8Bytes = new TextEncoder().encode(plain);
  const binaryString = String.fromCharCode(...utf8Bytes);
  return btoa(binaryString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Кодирование в base64url формат
 * @param {ArrayBuffer} buffer - данные для кодирования
 * @returns {string} закодированная строка
 */
function base64urlencode(buffer) {
  const str = String.fromCharCode(...new Uint8Array(buffer));
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Генерация code_verifier и code_challenge для PKCE
 * @returns {Promise<{verifier: string, challenge: string}>}
 */
export async function generatePKCE() {
  const verifier = generateRandomString(128);
  const challenge = await sha256(verifier);
  
  return {
    verifier,
    challenge
  };
}

/**
 * Сохранение PKCE verifier в localStorage
 * @param {string} verifier - code verifier
 */
export function savePKCEVerifier(verifier) {
  localStorage.setItem('pkce_verifier', verifier);
}

/**
 * Получение PKCE verifier из localStorage
 * @returns {string|null} code verifier
 */
export function getPKCEVerifier() {
  return localStorage.getItem('pkce_verifier');
}

/**
 * Удаление PKCE verifier из localStorage
 */
export function clearPKCEVerifier() {
  localStorage.removeItem('pkce_verifier');
}
