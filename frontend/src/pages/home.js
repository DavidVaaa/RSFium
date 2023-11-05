import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import CourseCard from "../components/CourseCard";
import tic3 from "../images/tic3.png";
import axios from './axiosConfig';
import './home.css';

import { useAuth } from '../AuthContext'; // Asegúrate de importar tu contexto de autenticación

const Home = () => {
  const { user } = useAuth(); // Obtén el usuario actual del contexto de autenticación
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    if (user) {
      // Verifica que tengas un usuario logeado antes de hacer la solicitud
      axios.get(`/api/materias/obtener/${user.userId}`).then((response) => {
        setUserCourses(response.data);
        console.log(response.data);
      });
    }
  }, [user]); // Asegúrate de incluir 'user' como dependencia para manejar cambios en el usuario


  return (
    <div className="home">
      <Header />
      <h2 id="title">Mis cursos</h2>
      <div className="courses">
        {userCourses.map((course, index) => (
          <CourseCard
            key={index}
            id={course.codigo}
            courseName={course.nombre}
            professor={course.nombre_profesor}
            imageUrl={tic3}
          />
        ))}

      </div>
    </div>
  );
};

export default Home;
