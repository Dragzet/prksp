// Типы действий (Actions Types)
export const TOGGLE_AGREEMENT = 'TOGGLE_AGREEMENT';
export const SUBMIT_AGREEMENT = 'SUBMIT_AGREEMENT';
export const RESET_AGREEMENT = 'RESET_AGREEMENT';

/**
 * Action Creator для переключения состояния чекбокса
 * @returns {Object} Action объект с типом TOGGLE_AGREEMENT
 */
export const toggleAgreement = () => {
  return {
    type: TOGGLE_AGREEMENT,
  };
};

/**
 * Action Creator для подтверждения соглашения
 * @returns {Object} Action объект с типом SUBMIT_AGREEMENT
 */
export const submitAgreement = () => {
  return {
    type: SUBMIT_AGREEMENT,
  };
};

/**
 * Action Creator для сброса формы
 * @returns {Object} Action объект с типом RESET_AGREEMENT
 */
export const resetAgreement = () => {
  return {
    type: RESET_AGREEMENT,
  };
};
