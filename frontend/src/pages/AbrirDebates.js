import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import './DetallesDebates.css';
import axios from './axiosConfig';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const AbrirDebates = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  // const [motivo, setMotivo] = useState('');
  const [fecha_original, setFechaOriginal] = useState('');
  const [fecha_nueva, setFechaNueva] = useState('');
  const { user } = useAuth(); // Obtén el usuario actual del contexto de autenticación
  const [userCourses, setUserCourses] = useState([]);
  const [evaluacion, setEvaluacion] = useState('');
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    if (user) {
      // Verifica que tengas un usuario logeado antes de hacer la solicitud
      axios.get(`/api/materias/obtener/${user.userId}`).then((response) => {
        setUserCourses(response.data);
        console.log(response.data);
      });
    }

  }, [user]);

  useEffect(() => {
    // Hacer una solicitud para obtener las evaluaciones basadas en la materia seleccionada
    if (materia) {
      axios.get(`/api/materia/${materia}/evaluaciones/`).then((response) => {
        setEvaluaciones(response.data);
      });
    }
  }, [materia]);

  const handleEvaluacionChange = (e) => {
    const evaluacionSeleccionada = e.target.value;
    setEvaluacion(evaluacionSeleccionada);

    // Encuentra la fecha de la evaluación seleccionada previamente y guárdala en el estado
    const evaluacionEncontrada = evaluaciones.find((evaluacionItem) => evaluacionItem.id == evaluacionSeleccionada);
    console.log(evaluacionEncontrada)
    if (evaluacionEncontrada) {
      setFechaOriginal(evaluacionEncontrada.fecha_evaluacion); // Supongo que el objeto de evaluación tiene una propiedad 'fecha'
    }
  };

  const iniciarDebate = () => {
    // Crea un objeto con los datos del debate
    const debateData = {
      nombre,
      evaluacion,
      fecha_original,
      fecha_nueva,
    };

    console.log(debateData);

    if (evaluacion){
      axios.post(`/api/evaluacion/${evaluacion}/debates/crear/`, debateData)
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito al usuario.
        console.log('Debate iniciado con éxito', response.data);
        alert('Debate creado con éxito');
        navigate('/debates');
      })
      .catch((error) => {
        // Maneja errores, por ejemplo, si la API devuelve un error.
        console.error('Error al iniciar el debate', error);
      });
    }

    // Realiza la solicitud POST al servidor utilizando Axios
    // axios
    //   .post('api/evaluacion/<int:evaluacion_id>/debates/crear/', debateData)
    //   .then((response) => {
    //     // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito al usuario.
    //     console.log('Debate iniciado con éxito', response.data);
    //   })
    //   .catch((error) => {
    //     // Maneja errores, por ejemplo, si la API devuelve un error.
    //     console.error('Error al iniciar el debate', error);
    //   });
  };

  return (
    <div>
      <Header />
      <h2 id="title">Abrir debate</h2>
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
              />
            </div>

            <div className="form-field">
              <label htmlFor="materia">Materia</label>
              {userCourses.length > 0 ? (  // Mostrar el select solo si hay materias
                <select
                  id="materia"
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                >
                  <option value="">Seleccione una materia</option> {/* Opción inicial sin valor */}
                  {userCourses.map((course) => (
                    <option key={course.codigo} value={course.codigo}>
                      {course.nombre}
                    </option>
                  ))}
                </select>
              ) : (
                <p>Cargando materias...</p>
              )}
            </div>


            <div className="form-field">
              <label htmlFor="evaluacion">Evaluación</label>
              <select
                id="evaluacion"
                value={evaluacion}
                onChange={handleEvaluacionChange}
              >
                <option value="">Seleccione una evaluacion</option> {/* Opción inicial sin valor */}
                {evaluaciones.map((evaluacionItem) => (
                  <option key={evaluacionItem.id} value={evaluacionItem.id}>
                    {evaluacionItem.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="form-field">
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
            </div> */}
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
              />
            </div>

            <div className="form-field">
              <button type="button" onClick={iniciarDebate}>
                Abrir Debate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AbrirDebates;