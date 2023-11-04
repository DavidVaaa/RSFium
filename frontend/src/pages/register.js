import React, { useState } from 'react';
import './login.css';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from './axiosConfig';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const email = `${username}@correo.um.edu.uy`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    try {
        await axios.post('/api/register/', {
        username,
        email,
        password,
      });
      
      // Registro exitoso, redirige al usuario a la página de inicio de sesión
      navigate('/'); // Ajusta la ruta según la estructura de tus rutas
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      // Maneja el error, muestra un mensaje de error o realiza otras acciones apropiadas.
    }
  };

  return (
    <div>
      <img src={logo} alt="FIUMER Logo" className="logo" />
      <h2>Bienvenido a FIUMER</h2>
      <p>Regístrate para continuar</p>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            placeholder="Usuario"
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
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <div className="input-container">
          <button className="login" type="submit">Regístrate</button>
        </div>
      </form>
      <p className="signup">¿Ya tienes una cuenta? <a href="/">Iniciar Sesión</a></p>
    </div>
  );
}

export default Register;
