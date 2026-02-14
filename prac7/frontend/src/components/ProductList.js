import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки товаров: ' + (err.error || err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      try {
        await deleteProduct(id);
        await loadProducts();
      } catch (err) {
        alert('Ошибка удаления товара: ' + (err.error || err));
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error">{error}</p>
        <button onClick={loadProducts}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="header">
        <h2>Список товаров</h2>
        <button className="btn-add" onClick={() => navigate('/add')}>
          + Добавить товар
        </button>
      </div>

      {products.length === 0 ? (
        <p className="empty-message">Нет товаров. Добавьте первый товар!</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} />
              )}
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">{parseFloat(product.price).toFixed(2)} ₽</p>
                <p className="quantity">В наличии: {product.quantity} шт.</p>
                {product.category && (
                  <span className="category">{product.category}</span>
                )}
              </div>
              <div className="actions">
                <button className="btn-view" onClick={() => handleView(product.id)}>
                  Просмотр
                </button>
                <button className="btn-edit" onClick={() => handleEdit(product.id)}>
                  Изменить
                </button>
                <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
