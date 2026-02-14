import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Практическая работа №4</h1>
      <h2>Оптимизация архитектуры React приложения</h2>
      
      <div className="home-content">
        <section className="info-section">
          <h3>Цель работы</h3>
          <p>
            Изучение способов улучшения архитектуры React-приложения за счёт создания 
            динамических путей, что направлено на оптимизацию структуры приложения и 
            упрощения процесса навигации пользователя по страницам.
          </p>
        </section>

        <section className="info-section">
          <h3>Реализованные возможности</h3>
          <ul>
            <li>✅ Динамическая маршрутизация с React Router</li>
            <li>✅ Использование props для передачи данных между компонентами</li>
            <li>✅ Модульная структура приложения</li>
            <li>✅ Страница диалогов с отображением сообщений</li>
            <li>✅ Компонентный подход к разработке</li>
          </ul>
        </section>

        <section className="info-section">
          <h3>Структура проекта</h3>
          <pre>
{`src/
├── components/          # Переиспользуемые компоненты
│   ├── DialogItem/     # Компонент элемента диалога
│   └── Message/        # Компонент сообщения
├── pages/              # Страницы приложения
│   ├── Home/           # Главная страница
│   ├── Dialogs/        # Страница диалогов
│   └── Profile/        # Страница профиля
├── App.js              # Главный компонент с маршрутизацией
└── index.js            # Точка входа`}
          </pre>
        </section>

        <div className="action-prompt">
          <p>Перейдите в раздел <strong>"Диалоги"</strong>, чтобы увидеть работу приложения</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
