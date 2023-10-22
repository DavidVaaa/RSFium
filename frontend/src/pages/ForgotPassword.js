import React, { useState } from 'react';
import './login.css';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos de usuario y candado
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const navigate = useNavigate();

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };


  return (
    <div>
      <img src={logo} alt="FIUMER Logo" className="logo" />
      <h2>Bienvenido a FIUMER</h2>
      <p>¿Olvidaste tu contraseña?</p>
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
          <button className="login" type="submit">Enviar</button>
        </div>
      </form>
      <div className="input-container">
        <button id="cancel" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default ForgotPassword;