import { TOGGLE_AGREEMENT, SUBMIT_AGREEMENT, RESET_AGREEMENT } from '../actions/agreementActions';

// Начальное состояние приложения
const initialState = {
  isAgreed: false,        // Состояние чекбокса (отмечен или нет)
  isSubmitted: false,     // Состояние отправки формы
  submittedAt: null,      // Время подтверждения соглашения
};

/**
 * Reducer для управления состоянием формы пользовательского соглашения
 * Это чистая функция, которая принимает текущее состояние и action,
 * и возвращает новое состояние на основе типа action
 * 
 * @param {Object} state - Текущее состояние
 * @param {Object} action - Действие (action) с типом и данными
 * @returns {Object} Новое состояние
 */
const agreementReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_AGREEMENT:
      // Переключаем состояние чекбокса
      // Используем spread operator для создания нового объекта состояния
      return {
        ...state,
        isAgreed: !state.isAgreed,
      };

    case SUBMIT_AGREEMENT:
      // Подтверждаем соглашение
      // Сохраняем время подтверждения
      return {
        ...state,
        isSubmitted: true,
        submittedAt: new Date().toISOString(),
      };

    case RESET_AGREEMENT:
      // Сбрасываем форму к начальному состоянию
      return initialState;

    default:
      // Если action неизвестен, возвращаем текущее состояние без изменений
      return state;
  }
};

export default agreementReducer;
