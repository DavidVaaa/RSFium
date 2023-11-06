import React, { useState } from 'react';
import './Debate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from '../pages/axiosConfig';
import { useAuth } from '../AuthContext';

function Debate({ id, nombreDelDebate, cerrado, rol }) {
    const { user } = useAuth(); // Obtén el usuario actual del contexto de autenticación
    const [debateClosed, setDebateClosed] = useState(cerrado);

    const handleCloseDebate = () => {
        const confirmClose = window.confirm('¿Desea cerrar el debate?');
        if (confirmClose) {
            //api/debate/cerrar/<int:debate_id>/<int:user_id>/
            axios.patch(`/api/debate/cerrar/${id}/${user.userId}/`)
            .then(response => {
                // Manejar la respuesta de la API si es necesario
                console.log('Debate cerrado con éxito');
               setDebateClosed(true);
                // Puedes realizar otras acciones después de cerrar el debate si es necesario
            })
            .catch(error => {
                // Manejar errores de la llamada a la API si es necesario
                console.error('Error al cerrar el debate', error);
            });
            
        }
    };

    return (
        <div className="debate">
            <h3>{nombreDelDebate}</h3>
            <div className="debate-buttons">
                <Link to={`/detalles-debates/${id}`}>
                    <button className="button">
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                </Link>
                {!debateClosed && rol == "Teacher" && (
                    <button className="button" onClick={handleCloseDebate}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Debate;


