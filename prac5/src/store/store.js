import { createStore } from 'redux';
import agreementReducer from '../reducers/agreementReducer';

// Ключ для хранения состояния в localStorage
const LOCAL_STORAGE_KEY = 'redux_agreement_state';

/**
 * Загрузка сохраненного состояния из localStorage
 * @returns {Object|undefined} Сохраненное состояние или undefined
 */
const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined; // Если нет сохраненного состояния, reducer использует initialState
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Ошибка загрузки состояния из localStorage:', err);
    return undefined;
  }
};

/**
 * Сохранение состояния в localStorage
 * @param {Object} state - Состояние для сохранения
 */
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Ошибка сохранения состояния в localStorage:', err);
  }
};

// Загружаем сохраненное состояние при инициализации
const persistedState = loadState();

/**
 * Создание Redux Store (хранилища)
 * Store - это единственный источник истины (Single Source of Truth) для всего приложения
 * Все состояние приложения хранится в одном объекте
 * С добавлением persistence - состояние сохраняется в localStorage
 */
const store = createStore(
  agreementReducer,
  persistedState, // Инициализируем store сохраненным состоянием
  // Подключение Redux DevTools для отладки (если расширение установлено в браузере)
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Подписываемся на изменения store и сохраняем состояние в localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
