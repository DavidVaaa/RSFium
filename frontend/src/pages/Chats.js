import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Chats.css';
import Evaluacion from '../components/Evaluacion';
import axios from './axiosConfig';

const Chats = () => {
  const { courseName } = useParams();
  const { id_materia } = useParams();
  const [userEvents, setUserEvents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [contenido, setUserMessage] = useState('');
  const { user } = useAuth(); // Obtén el usuario actual del contexto de autenticación
  const url = window.location.href;
  const chatId = url.substring(url.lastIndexOf('/') + 1);

  useEffect(() => {
    // Obtener los mensajes del chat desde el backend cuando se monta el componente
    axios.get(`/api/materia/${chatId}/comentarios/`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener mensajes del chat:', error);
      });

    // Obtener evaluaciones de la materia
    axios.get(`/api/materia/${chatId}/evaluaciones/`)
      .then((response) => {
        setUserEvents(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener evaluaciones de la materia', error);
      });
  }, [id_materia, chatId]);


  // Función para enviar un nuevo mensaje
  const sendMessage = (contenido) => {
    // Enviar el nuevo mensaje al backend y guardar localmente después de la confirmación
    axios.post(`/api/materia/${chatId}/${user.userId}/comentario/crear/`, { contenido })
    .then((response) => {
        const newMessage = response.data;
        setMessages([...messages, newMessage]);
      })
      .catch((error) => {
        console.error('Error al crear un comentario:', error);
      });
  }

  return (
    <div className="chats">
      <div className="evaluations-panel">
        <h2 id="title">Evaluaciones</h2>
        <Evaluacion evaluations={userEvents} />
      </div>

      <div className="chat-container">
        <Header />
        <h2 id="title">{courseName} Chat</h2>

        <div className="message-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? 'user' : 'other'}`}
            >
              {message.contenido}
            </div>
          ))}
        </div>

        <div className="input-container-chats">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={contenido}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button
            onClick={() => {
              sendMessage(contenido, true);
              setUserMessage('');
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chats;