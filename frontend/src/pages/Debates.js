import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Debate from '../components/Debate';
import axios from 'axios'; // Importa Axios
import './Debates.css';
import { useNavigate } from 'react-router-dom';

const Debates = () => {
  const navigate = useNavigate();

  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realiza una solicitud GET al servidor para obtener la lista de debates al cargar la página.
    axios
      .get('/api/debates/')
      .then((response) => {
        setDebates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de debates', error);
        setLoading(false);
      });
  }, []);

  const abrirDebate = () => {
    // Redirige al usuario a la página de detalles de debates para abrir un nuevo debate.
    navigate('/detalles-debates');
  };

  return (
    <div className="debates">
      <Header />
      <h2 id="title">Debates</h2>
      <button className="abrir-debate" onClick={abrirDebate}>
        Abrir debate
      </button>

      {loading ? (
        <p>Cargando debates...</p>
      ) : (
        debates.map((debate) => (
          <Debate key={debate.id} nombreDelDebate={debate.nombre} />
        ))
      )}
    </div>
  );
};

export default Debates;
