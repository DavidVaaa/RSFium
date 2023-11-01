import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import { useParams } from 'react-router-dom';
import './Chats.css';
import Evaluacion from '../components/Evaluacion';
import axios from './axiosConfig';

const Chats = () => {
  const { courseName } = useParams();
  const { id } = useParams();
  
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    // Obtener los mensajes del chat desde el backend cuando se monta el componente
    axios.get(`/api/chat/${id}/comentarios/`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener mensajes del chat:', error);
      });
  }, [id]);

  const sendMessage = (text, isUser) => {
    // Enviar el nuevo mensaje al backend y guardar localmente después de la confirmación
    axios.post(`/api/materia/${id}/chat/${id}/crear-comentario/`, { text, isUser })
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
        <Evaluacion
          evaluations={[
            { name: 'Parcial 1', date: '2021-10-03' },
            { name: 'Parcial 2', date: '2021-10-15' },
            { name: 'Parcial 3', date: '2021-11-18' },
          ]}
        />
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
              {message.text}
            </div>
          ))}
        </div>

        <div className="input-container-chats">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button
            onClick={() => {
              sendMessage(userMessage, true); // Usar el mensaje del estado
              setUserMessage(''); // Limpiar el input después de enviar el mensaje
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
