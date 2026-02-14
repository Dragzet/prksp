import React from 'react';
import '../App.css';

// Страница "Контакты"
const Contacts = () => {
  return (
    <div className="contacts">
      <h1>Контактная информация</h1>
      <div className="contact-info">
        <p><strong>Адрес:</strong> г. Москва, ул. Примерная, д. 123</p>
        <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
        <p><strong>Email:</strong> info@shop.ru</p>
        <p><strong>Режим работы:</strong> Пн-Пт: 9:00 - 18:00</p>
      </div>
    </div>
  );
};

export default Contacts;
