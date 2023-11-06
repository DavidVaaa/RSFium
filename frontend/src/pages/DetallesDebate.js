import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import './DetallesDebates.css';
import axios from './axiosConfig';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const DetallesDebates = () => {
  const { user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha_original, setFechaOriginal] = useState('');
  const [fecha_nueva, setFechaNueva] = useState('');
  const [evaluacion, setEvaluacion] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [cerrado, setCerrado] = useState(false);


  const { debateId } = useParams();
  useEffect(() => {
    // Realiza una solicitud para obtener los detalles del debate en función de su identificador (debateId)
    axios.get(`/api/debates/${debateId}`)
      .then((response) => {
        const debate = response.data;
        setNombre(debate.nombre);
        setFechaOriginal(debate.fecha_original);
        setFechaNueva(debate.fecha_nueva);
        setCerrado(debate.cerrado);
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
        axios.get(`/api/debates/${debateId}/comentarios/`)
          .then((response) => {
            const comentarios = response.data;
            
            setComentarios(comentarios);

          })
          .catch((error) => {
            console.error('Error al cargar los detalles del debate', error);
          });
      })
      .catch((error) => {
        console.error('Error al cargar los detalles del debate', error);
      });
  }, [debateId]);
  

  const agregarComentario = () => {
    if (cerrado) {
      // El debate está cerrado, no se permite agregar comentarios
      alert('El debate está cerrado y no se pueden agregar comentarios.');
      return;
    }
    if (nuevoComentario.trim() === "") {
      return;
    }
    // Realiza una solicitud para agregar un nuevo comentario al debate
    axios
      .post(`/api/debate/${debateId}/crear/${user.userId}/`, {
        fecha_creacion: new Date(),
        usuario: user.userId,
        debate: debateId,
        contenido: nuevoComentario
      })
      .then((response) => {
        const nuevoComentarioFormateado = {
          id: response.data.id, // Asegúrate de que response.data.id sea la propiedad correcta
          contenido: nuevoComentario
        };
        setComentarios([...comentarios, nuevoComentarioFormateado]);
        setNuevoComentario('');
      })
      .catch((error) => {
        console.error('Error al agregar el comentario', error);
      });
  };



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
        <div className="form-column">
          <h3>Comentarios del debate</h3>
          <ul className="comment-list">
            {comentarios.map((comentario) => (
              <li key={comentario.id}>{comentario.contenido}</li>
            ))}
          </ul>
          <div className="form-field">
            <label htmlFor="nuevoComentario">Agregar Comentario</label>
            <input
              type="text"
              id="nuevoComentario"
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
          </div>
          <button onClick={agregarComentario}>Agregar</button>
        </div>
      </div>
    </div>
  );

};

export default DetallesDebates;

