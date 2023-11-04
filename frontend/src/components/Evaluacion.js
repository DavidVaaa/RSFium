import React from 'react';
import './Evaluacion.css';

const Evaluacion = ({ evaluations }) => {
  return (
    <div className="evaluations-list">
      {evaluations.map((evaluation, index) => (
        <div key={index} className="evaluation">
          <p className="evaluation-data">{evaluation.nombre} - {evaluation.fecha_evaluacion}</p>
        </div>
      ))}
    </div>
  );
};

export default Evaluacion;
