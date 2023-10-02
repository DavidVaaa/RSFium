import React from 'react';
import './CourseCard.css';

function CourseCard({ courseName, professor, imageUrl }) {
  return (
    <div className="course-card">
      <img src={imageUrl} alt={courseName} className="course-image" />
      <div className="course-details">
        <h2 className="course-name">{courseName}</h2>
        <p className="professor">Profesor: {professor}</p>
      </div>
    </div>
  );
}

export default CourseCard;
