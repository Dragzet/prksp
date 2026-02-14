import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import '../App.css';

// Компонент списка товаров
const ProductList = () => {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductList;
