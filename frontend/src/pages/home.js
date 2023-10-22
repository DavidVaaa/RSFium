import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import CourseCard from "../components/CourseCard";
import tic3 from "../images/tic3.png";
import axios from 'axios';

const Home = () => {
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a la API de cursos del usuario
    axios.get('/api/user-courses/').then((response) => {
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
            courseName={course.courseName}
            professor={course.professor}
            imageUrl={tic3}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
