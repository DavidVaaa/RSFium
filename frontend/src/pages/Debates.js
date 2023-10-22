import React from 'react';
import Header from '../components/header';
import Debate from '../components/Debate';
import './Debates.css';
import { useNavigate } from 'react-router-dom';


const Debates = () => {
    const navigate = useNavigate();

    return (
        <div className="debates">
            <Header />
            <h2 id="title">Debates</h2>
            <button className="abrir-debate" onClick={() => navigate('/detalles-debates')}>
                Abrir debate
            </button>

            <Debate nombreDelDebate="Parcial Ingeniería de Software" />
            <Debate nombreDelDebate="Defensa IO 2" />
            <Debate nombreDelDebate="Control análisis 1" />

        </div>
    );
};

export default Debates;
