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
  const { user } = useAuth();
  const url = window.location.href;
  const chatId = url.substring(url.lastIndexOf('/') + 1);

  useEffect(() => {
    axios.get(`/api/materia/${chatId}/comentarios/`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener mensajes del chat:', error);
      });

    axios.get(`/api/materia/${chatId}/evaluaciones/`)
      .then((response) => {
        setUserEvents(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener evaluaciones de la materia', error);
      });
  }, [id_materia, chatId]);

  const sendMessage = () => {
    // Actualiza el estado local antes de enviar la solicitud al servidor
    const newMessage = {
      usuario: user.userId,
      contenido: contenido,
    };
    setMessages([...messages, newMessage]);
    setUserMessage('');

    // Envía el nuevo mensaje al servidor
    axios.post(`/api/materia/${chatId}/${user.userId}/comentario/crear/`, { contenido })
      .then((response) => {
        // El servidor puede devolver una respuesta, pero no necesariamente la usamos aquí
        // Si lo deseas, puedes manejar la respuesta del servidor aquí.
      })
      .catch((error) => {
        console.error('Error al crear un comentario:', error);
        // En caso de error, puedes revertir la actualización del estado local si es necesario.
        // Por ejemplo, puedes eliminar el nuevo mensaje del estado local.
        const index = messages.findIndex((message) => message === newMessage);
        if (index !== -1) {
          const newMessages = [...messages];
          newMessages.splice(index, 1);
          setMessages(newMessages);
        }
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
              className={`message ${message.usuario === user.userId ? 'user' : 'other'}`}
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
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default Chats;
