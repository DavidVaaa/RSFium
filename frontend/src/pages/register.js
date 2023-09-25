import React, { useState } from 'react';
import './login.css';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';


function Register() {
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
  };


  return (
    <div>
      <img src={logo} alt="FIUMER Logo" className="logo" />
      <h2>Bienvenido a FIUMER</h2>
      <p>Registrate para continuar</p>
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
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Registrate</button>
      </form>
      <p className="signup">¿Ya tienes una cuenta? <a href="/">Iniciar Sesión</a></p>
    </div>
  );
}

export default Register;