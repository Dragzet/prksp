import React from 'react';
import ProductList from '../components/ProductList';
import '../App.css';

// Главная страница с приветствием и списком товаров
const Home = () => {
  return (
    <div className="home">
      <h1>Добро пожаловать в наш интернет-магазин!</h1>
      <p>Выберите товар из нашего каталога</p>
      <ProductList />
    </div>
  );
};

export default Home;
