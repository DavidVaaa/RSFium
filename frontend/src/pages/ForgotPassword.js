import React, { useState } from 'react';
import './login.css';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos de usuario y candado
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/api/reset-password', { email: username });
      // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito al usuario.
      console.log('Contraseña restablecida con éxito', response.data);
    } catch (error) {
      // Maneja errores, como un correo electrónico no registrado.
      console.error('Error al restablecer la contraseña', error);
    }
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