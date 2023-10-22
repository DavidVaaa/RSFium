import React, { useState } from 'react';
import './Debate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Debate({ nombreDelDebate }) {
    const navigate = useNavigate();
    const [debateClosed, setDebateClosed] = useState(false);

    const handleCloseDebate = () => {
        const confirmClose = window.confirm('¿Desea cerrar el debate?');
        if (confirmClose) {
            // Realizar la acción de cierre aquí
            // Por ejemplo, redirigir a otra página o ejecutar una función
            setDebateClosed(true); // Actualizar el estado para ocultar la cruz
        }
    };

    return (
        <div className="debate">
            <h3>{nombreDelDebate}</h3>
            <div className="debate-buttons">
                <button className="button" onClick={() => navigate('/detalles-debates')}>
                    <FontAwesomeIcon icon={faEye} />
                </button>
                {!debateClosed && (
                    <button className="button" onClick={handleCloseDebate}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Debate;


