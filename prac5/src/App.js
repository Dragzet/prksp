import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import AgreementForm from './components/AgreementForm';
import './App.css';

/**
 * Главный компонент приложения
 * Provider - компонент-обёртка из react-redux, который делает Redux store
 * доступным для всех вложенных компонентов
 */
const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <h1>Практическая работа №5</h1>
          <p>Redux: Управление состоянием приложения</p>
        </header>
        
        <main className="app-main">
          <AgreementForm />
        </main>
        
        <footer className="app-footer">
          <p>Демонстрация работы Redux с формой пользовательского соглашения</p>
          <p className="footer-note">
            Откройте Redux DevTools в браузере для просмотра состояния и действий
          </p>
        </footer>
      </div>
    </Provider>
  );
};

export default App;
