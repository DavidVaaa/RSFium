import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Reemplaza con la URL base de tu backend
  // Otras opciones de configuración de Axios si las necesitas
});

export default instance;
