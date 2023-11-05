import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import './DetallesDebates.css';
import axios from './axiosConfig';
import { useParams } from 'react-router-dom';

const DetallesDebates = () => {
  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha_original, setFechaOriginal] = useState('');
  const [fecha_nueva, setFechaNueva] = useState('');
  const [evaluacion, setEvaluacion] = useState('');

  const { debateId } = useParams();

  useEffect(() => {
    // Realiza una solicitud para obtener los detalles del debate en función de su identificador (debateId)
    axios.get(`/api/debates/${debateId}`)
      .then((response) => {
        const debate = response.data;
        setNombre(debate.nombre);
        setFechaOriginal(debate.fecha_original);
        setFechaNueva(debate.fecha_nueva);
        axios.get(`/api/evaluaciones/${debate.evaluacion}`)
          .then((response) => {
            setEvaluacion(response.data.nombre);
            axios.get(`/api/materias/${response.data.codigo_materia}`)
              .then((response) => {
                setMateria(response.data.nombre);
              })
              .catch((error) => {
                console.error('Error al cargar los detalles del debate', error);
              });
          })
          .catch((error) => {
            console.error('Error al cargar los detalles del debate', error);
          });
      })
      .catch((error) => {
        console.error('Error al cargar los detalles del debate', error);
      });
  }, [debateId]);

  // useEffect(() => {
  //   // Realiza una solicitud para obtener los detalles del debate en función de su identificador (debateId)
  //   axios.get(`/api/evaluaciones/${evaluacion}`)
  //     .then((response) => {
  //       setMateria(response.data.codigo_materia);
  //       setEvaluacion(response.data.nombre);
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Error al cargar los detalles del debate', error);
  //     });
  // }, [debateId]);



  return (
    <div>
      <Header />
      <h2 id="title">Detalles debate</h2>
      <div className="form-container">
        <div className="form-column">
          <form>
            <div className="form-field">
              <label htmlFor="nombre">Nombre del debate</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled
              />
            </div>

            <div className="form-field">
              <label htmlFor="materia">Materia</label>
              <select
                id="materia"
                value={materia}
                disabled
              >
                <option value={materia}>{materia}</option>
              </select>
            </div>


            <div className="form-field">
              <label htmlFor="evaluacion">Evaluación</label>

              <select
                id="evaluacion"
                value={evaluacion}
                disabled
              >
                <option value={evaluacion}>{evaluacion}</option>
              </select>
            </div>

          </form>
        </div>
        <div className="form-column">
          <form>
            <div className="form-field">
              <label htmlFor="fecha_original">Fecha Original</label>
              <input
                type="date"
                id="fecha_original"
                value={fecha_original}
                onChange={(e) => setFechaOriginal(e.target.value)}
                disabled
              />
            </div>

            <div className="form-field">
              <label htmlFor="fecha_nueva">Fecha Nueva</label>
              <input
                type="date"
                id="fecha_nueva"
                value={fecha_nueva}
                onChange={(e) => setFechaNueva(e.target.value)}
                disabled
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default DetallesDebates;

