import React from 'react';
import './CourseCard.css';
import { Link } from 'react-router-dom';

function CourseCard({ id, courseName, professor, imageUrl }) {
  return (
    <div className="course-card">
      <Link to={`/chats/${id}`}>
        <img src={imageUrl} alt={courseName} className="course-image" />
        <div className="course-details">
          <h2 className="course-name">{courseName}</h2>
          <p className="professor">Profesor: {professor}</p>
        </div>
      </Link>
    </div>
  );
}

export default CourseCard;
