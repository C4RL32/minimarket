import React, { useState, useEffect } from 'react';
import { loginUser } from './authService';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import Confetti from 'react-confetti';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Actualizar tamaño de ventana para el confeti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      setMessage('🎉 ¡Login exitoso! Redirigiendo...');
      setShowConfetti(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      setMessage('🔐 ' + (err.response?.data?.message || '¡Ups! Contraseña incorrecta'));
      setShowConfetti(false);
    }
  };

  return (
    <div className="login-container">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <div className="login-card">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <div className="divider"></div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>
              <FiMail className="icon" /> Correo Electrónico
            </label>
            <input
              name="email"
              type="email"
              placeholder="ejemplo@minimarket.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>
              <FiLock className="icon" /> Contraseña
            </label>
            <div className="password-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            <FiLogIn /> Ingresar
          </button>
        </form>

        {message && (
          <p className={`message ${message.includes('🎉') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        <div className="login-footer">
          <p>¿No tienes cuenta? <a href="/register">¡Regístrate aquí! 🚀</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;