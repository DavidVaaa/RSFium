import React, { useState } from 'react';
import './login.css';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos de usuario y candado

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Agrega lógica para autenticar al usuario aquí
  };

  return (
    <div>
      <img src={logo} alt="FIUMER Logo" className="logo" />
      <h2>Bienvenido a FIUMER</h2>
      <p>Iniciar sesión para continuar</p>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p className="signup">¿No tienes una cuenta? <a href="#">Regístrate</a></p>
    </div>
  );
}

export default Login;

