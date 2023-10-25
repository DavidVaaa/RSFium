import React from "react";
import Header from "../components/header";
import CourseCard from "../components/CourseCard";
import tic3 from "../images/tic3.png";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <h2 id = "title">Mis cursos</h2>
      <div className="courses">
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
