import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import '../App.css';

// Компонент детальной страницы товара
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Находим товар по id из параметров URL
  const product = products.find(p => p.id === parseInt(id));

  // Если товар не найден
  if (!product) {
    return (
      <div className="not-found">
        <h1>Товар не найден</h1>
        <p>К сожалению, товар с ID {id} не существует.</p>
      </div>
    );
  }

  const handleBuy = () => {
    alert(`Товар "${product.name}" добавлен в корзину!`);
    navigate('/');
  };

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p className="description">{product.description}</p>
      <span className="price">{product.price} руб.</span>
      <button className="buy-button" onClick={handleBuy}>
        Купить
      </button>
    </div>
  );
};

export default ProductDetail;
