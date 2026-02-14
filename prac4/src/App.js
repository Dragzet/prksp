import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dialogs from './pages/Dialogs/Dialogs';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <nav className="nav">
            <Link to="/" className="nav-link">Главная</Link>
            <Link to="/dialogs" className="nav-link">Диалоги</Link>
            <Link to="/profile" className="nav-link">Профиль</Link>
          </nav>
        </header>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dialogs" element={<Dialogs />} />
            <Route path="/dialogs/:userId" element={<Dialogs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
