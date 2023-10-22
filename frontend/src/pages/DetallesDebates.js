import React, { useState } from 'react';
import Header from '../components/header';
import './DetallesDebates.css';

const DetallesDebates = () => {
  const [nombreDebate, setNombreDebate] = useState('');
  const [evaluacion, setEvaluacion] = useState('');
  const [motivo, setMotivo] = useState('');
  const [fechaOriginal, setFechaOriginal] = useState('');
  const [fechaNueva, setFechaNueva] = useState('');

  const iniciarDebate = () => {
    // Aquí puedes realizar alguna acción cuando se inicie el debate, como enviar los datos al servidor.
  };

  return (
    <div>
      <Header />
      <h2 id="title">Iniciar debate</h2>
      <div className="form-container">
        <div className="form-column">
          <form>
            <div className="form-field">
              <label htmlFor="nombreDebate">Nombre del debate</label>
              <input
                type="text"
                id="nombreDebate"
                value={nombreDebate}
                onChange={(e) => setNombreDebate(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="evaluacion">Evaluación</label>
              <select
                id="evaluacion"
                value={evaluacion}
                onChange={(e) => setEvaluacion(e.target.value)}
              >
                <option value="Parcial">Parcial</option>
                <option value="Entrega">Entrega</option>
                <option value="Defensa">Defensa</option>
                <option value="Control">Control</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="motivo">Motivo</label>
              <select
                id="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              >
                <option value="coincidencia">Otro parcial coincide fecha</option>
                <option value="Viaje">Viaje</option>
                <option value="Trabajo">Trabajo</option>
              </select>
            </div>
          </form>
        </div>
        <div className="form-column">
          <form>
            <div className="form-field">
              <label htmlFor="fechaOriginal">Fecha Original</label>
              <input
                type="date"
                id="fechaOriginal"
                value={fechaOriginal}
                onChange={(e) => setFechaOriginal(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="fechaNueva">Fecha Nueva</label>
              <input
                type="date"
                id="fechaNueva"
                value={fechaNueva}
                onChange={(e) => setFechaNueva(e.target.value)}
              />
            </div>

            <div className="form-field">
              <button type="button" onClick={iniciarDebate}>
                Iniciar Debate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetallesDebates;

