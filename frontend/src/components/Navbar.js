// Ejemplo básico en Navbar.js
import { Link } from 'react-router-dom';
import { FiUserPlus, FiLogIn } from 'react-icons/fi';

function Navbar() {
  return (
    <nav>
      <div className="auth-links">
        <Link to="/register"><FiUserPlus /> Registrarse</Link>
        <span className="divider">|</span>
        <Link to="/login"><FiLogIn /> Iniciar Sesión</Link>
      </div>
    </nav>
  );
}