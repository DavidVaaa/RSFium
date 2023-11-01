import React, { useState } from 'react';
import './login.css';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos de usuario y candado
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from './axiosConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Define los datos para enviar al backend
    const userData = {
      username,
      password,
    };
    loginUser(userData);
    try {
      const response = await axios.post('/api/login/', userData);
      // Establece el usuario logeado y su ID
      loginUser({
        user: response.data,
        userId: response.data.id, // Suponiendo que el ID del usuario se encuentra en response.data.id
      });
      console.log('Inicio de sesión exitoso:', response.data);
      // Redirige a la página de inicio
      navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
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
        <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
        <div className="input-container">
          <button className="login" type="submit">Iniciar Sesión</button>
        </div>
      </form>
      <p className="signup">¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
    </div>
  );
}

export default Login;

