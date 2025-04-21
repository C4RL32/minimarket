import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ background: '#008080', padding: '10px', color: 'white' }}>
      <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Inicio</Link>
      <Link to="/catalog" style={{ color: 'white', marginRight: '15px' }}>Catálogo</Link>
      <Link to="/cart" style={{ color: 'white', marginRight: '15px' }}>Carrito</Link>
      <Link to="/login" style={{ color: 'white', marginRight: '15px' }}>Login</Link>
      <Link to="/admin" style={{ color: 'white' }}>Admin</Link>
    </nav>
  );
};

export default Navbar;
