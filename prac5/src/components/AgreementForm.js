import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAgreement, submitAgreement, resetAgreement } from '../actions/agreementActions';
import './AgreementForm.css';

/**
 * Компонент формы принятия пользовательского соглашения
 * Демонстрирует использование Redux для управления состоянием
 */
const AgreementForm = () => {
  // useSelector - хук для получения данных из Redux Store
  // Принимает функцию-селектор, которая получает state и возвращает нужные данные
  const isAgreed = useSelector((state) => state.isAgreed);
  const isSubmitted = useSelector((state) => state.isSubmitted);
  const submittedAt = useSelector((state) => state.submittedAt);

  // useDispatch - хук для получения функции dispatch
  // dispatch используется для отправки actions в Redux Store
  const dispatch = useDispatch();

  /**
   * Обработчик изменения состояния чекбокса
   * Вызывает action creator toggleAgreement и отправляет action в store
   */
  const handleCheckboxChange = () => {
    dispatch(toggleAgreement());
  };

  /**
   * Обработчик отправки формы
   * Вызывает action creator submitAgreement и отправляет action в store
   * @param {Event} e - Событие отправки формы
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    
    if (isAgreed) {
      dispatch(submitAgreement());
    }
  };

  /**
   * Обработчик сброса формы
   * Вызывает action creator resetAgreement и отправляет action в store
   */
  const handleReset = () => {
    dispatch(resetAgreement());
  };

  // Если форма уже отправлена, показываем сообщение об успехе
  if (isSubmitted) {
    return (
      <div className="agreement-container">
        <div className="success-message">
          <h2>✓ Соглашение принято!</h2>
          <p>Спасибо за принятие пользовательского соглашения.</p>
          <p className="timestamp">
            Время подтверждения: {new Date(submittedAt).toLocaleString('ru-RU')}
          </p>
          <button onClick={handleReset} className="reset-button">
            Сбросить форму
          </button>
        </div>
      </div>
    );
  }

  // Основная форма
  return (
    <div className="agreement-container">
      <div className="agreement-form">
        <h1>Пользовательское соглашение</h1>
        
        <div className="agreement-text">
          <h3>Условия использования</h3>
          <p>
            Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения 
            между администрацией приложения и пользователем данного приложения.
          </p>
          <p>
            Использование приложения означает безоговорочное согласие пользователя с настоящим 
            Соглашением и указанными в нём условиями.
          </p>
          <ul>
            <li>Пользователь обязуется использовать приложение только в законных целях</li>
            <li>Пользователь несёт ответственность за сохранность своих учётных данных</li>
            <li>Администрация оставляет за собой право изменять условия соглашения</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={handleCheckboxChange}
                className="agreement-checkbox"
              />
              <span className="checkbox-text">
                Я прочитал(а) и принимаю условия пользовательского соглашения
              </span>
            </label>
          </div>

          <div className="button-container">
            <button
              type="submit"
              disabled={!isAgreed}
              className={`submit-button ${!isAgreed ? 'disabled' : ''}`}
            >
              Подтвердить соглашение
            </button>
          </div>

          {/* Отображение текущего состояния для демонстрации работы Redux */}
          <div className="state-info">
            <p>
              <strong>Состояние в Redux Store:</strong>
            </p>
            <p>Чекбокс отмечен: {isAgreed ? 'Да' : 'Нет'}</p>
            <p>Кнопка активна: {isAgreed ? 'Да' : 'Нет'}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgreementForm;
