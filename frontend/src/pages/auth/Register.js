import React, { useState, useEffect } from 'react';
import { registerUser } from './authService';
import { FiUser, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';
import Confetti from 'react-confetti';
import './Register.css'; // Usaremos los mismos estilos base que Login.css

const Register = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });
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
      const res = await registerUser(form);
      setMessage('🎉 ¡Registro exitoso! Redirigiendo...');
      setShowConfetti(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setMessage('🔐 ' + (err.response?.data?.message || 'Error al registrar'));
      setShowConfetti(false);
    }
  };







  
  return (
    <div className="login-container"> {/* Mismo contenedor que login */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <div className="login-card"> {/* Misma tarjeta estilizada */}
        <div className="login-header">
          <h2>Crear Cuenta</h2>
          <div className="divider"></div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>
              <FiUser className="icon" /> Nombre Completo
            </label>
            <input
              name="name"
              type="text"
              placeholder="Ej: Juan Pérez"
              onChange={handleChange}
              required
            />
          </div>

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
                placeholder="Mínimo 6 caracteres"
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
            <FiCheckCircle /> Registrarse
          </button>
        </form>

        {message && (
          <p className={`message ${message.includes('🎉') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        <div className="login-footer">
          <p>¿Ya tienes cuenta? <a href="/login">¡Inicia sesión aquí! 👋</a></p>
        </div>
      </div>
    </div>
  );
};




export default Register;