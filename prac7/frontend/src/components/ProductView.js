import React, { useState, useEffect } from 'react';
import { getProductById } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductView.css';

function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки товара: ' + (err.error || err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Загрузка товара...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error">{error}</p>
        <button onClick={() => navigate('/')}>Вернуться к списку</button>
      </div>
    );
  }

  if (!product) {
    return <div className="error">Товар не найден</div>;
  }

  return (
    <div className="product-view">
      <div className="view-header">
        <h2>Просмотр товара</h2>
        <button className="btn-back" onClick={() => navigate('/')}>
          ← Назад к списку
        </button>
      </div>

      <div className="product-details">
        {product.imageUrl && (
          <div className="image-container">
            <img src={product.imageUrl} alt={product.name} />
          </div>
        )}

        <div className="details-content">
          <h1>{product.name}</h1>
          
          {product.category && (
            <span className="category-badge">{product.category}</span>
          )}

          <div className="price-section">
            <span className="price">{parseFloat(product.price).toFixed(2)} ₽</span>
            <span className="quantity">В наличии: {product.quantity} шт.</span>
          </div>

          {product.description && (
            <div className="description-section">
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>
          )}

          <div className="meta-info">
            <div className="meta-item">
              <strong>ID:</strong> {product.id}
            </div>
            <div className="meta-item">
              <strong>Создан:</strong> {new Date(product.createdAt).toLocaleString('ru-RU')}
            </div>
            <div className="meta-item">
              <strong>Обновлен:</strong> {new Date(product.updatedAt).toLocaleString('ru-RU')}
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="btn-edit-large" 
              onClick={() => navigate(`/edit/${product.id}`)}
            >
              Редактировать товар
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
