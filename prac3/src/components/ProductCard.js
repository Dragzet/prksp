import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Компонент карточки товара с использованием props
const ProductCard = ({ id, name, price, image, description }) => {
  return (
    <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
      <div className="product-card">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
        <p className="price">{price} руб.</p>
      </div>
    </Link>
  );
};

export default ProductCard;
