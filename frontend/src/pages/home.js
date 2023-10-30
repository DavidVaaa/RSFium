import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import CourseCard from "../components/CourseCard";
import tic3 from "../images/tic3.png";
import axios from './axiosConfig';
import './home.css';

const Home = () => {
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    // EL id esta hardcodeado, se debe importar
    axios.get('/api/materias/obtener/9').then((response) => {
      setUserCourses(response.data);
    });
  }, []);

  return (
    <div className="home">
      <Header />
      <h2 id="title">Mis cursos</h2>
      <div className="courses">
        {userCourses.map((course, index) => (
          <CourseCard
            key={index}
            courseName={course.nombre}
            professor={course.nombre_profesor}
            imageUrl={tic3}
          />
        ))}

      <CourseCard
        id = "1"
        courseName="TIC 3"
        professor="Pablo Urquizo"
        imageUrl={tic3}
      />
      <CourseCard
        id = "2"
        courseName="Análisis Matemático 1"
        professor="Pepe Diaz"
        imageUrl={tic3}
      />
      <CourseCard
        id = "2"
        courseName="Análisis Matemático 1"
        professor="Pepe Diaz"
        imageUrl={tic3}
      />
      <CourseCard
        id = "2"
        courseName="Análisis Matemático 1"
        professor="Pepe Diaz"
        imageUrl={tic3}
      />
      </div>
    </div>
  );
};

export default Home;
