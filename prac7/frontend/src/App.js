import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductEdit from './components/ProductEdit';
import ProductView from './components/ProductView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🛒 Интернет-магазин</h1>
          <p>CRUD приложение на React + PostgreSQL</p>
        </header>
        
        <main className="App-main">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductEdit />} />
            <Route path="/view/:id" element={<ProductView />} />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>© 2026 CRUD приложение - Практическая работа №7</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
