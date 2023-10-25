import React, { useState } from 'react';
import Header from '../components/header';
import { useParams } from 'react-router-dom';
import './Chats.css';
import Evaluacion from '../components/Evaluacion';

const Chats = () => {
  const { courseName } = useParams();
  const { id } = useParams();

  // Estado para almacenar los mensajes
  const [messages, setMessages] = useState([
    { text: 'Hola, bienvenidos al chat de ' + id, isUser: false },
    { text: '¡Hola! ¿En qué puedo ayudarte?', isUser: true },
  ]);

  // Estado para almacenar el mensaje que el usuario está escribiendo
  const [userMessage, setUserMessage] = useState('');

  // Función para enviar un nuevo mensaje
  const sendMessage = (text, isUser) => {
    const newMessage = { text, isUser };
    setMessages([...messages, newMessage]);
  };

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
