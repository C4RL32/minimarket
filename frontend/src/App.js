import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiUserPlus, FiLogIn } from 'react-icons/fi';
import './App.css'; // Asegúrate de crear este archivo
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

function App() {
  return (
    <Router>
      <nav className="main-nav">
        <div className="auth-links">
          <Link to="/register" className="nav-link">
            <FiUserPlus className="nav-icon" /> Registrarse
          </Link>
          <span className="divider">|</span>
          <Link to="/login" className="nav-link">
            <FiLogIn className="nav-icon" /> Iniciar Sesión
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;