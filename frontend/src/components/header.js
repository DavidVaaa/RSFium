import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import logo from '../images/logo.png';
import axios from 'axios';
import { useAuth, logoutUser } from '../AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userRef = useRef(null);
    const navigate = useNavigate();


    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleEditUser = () => {
        // Implementa la lógica para editar el usuario aquí\
        navigate('/editar-usuario'); 
    };

    const handleLogout = () => {
        // logoutUser(); 
        navigate('/'); 
    };

    // Calcula la posición de las opciones del menú
    const menuStyle = {
        top: userRef.current ? userRef.current.offsetHeight : '0',
    };

    return (
        <header className="header">
            <nav className="nav">
                <ul>
                    <li><Link to="/home">Mis cursos</Link></li>
                    <li><Link to="/calendar">Calendario</Link></li>
                    <li><Link to="/debates">Debates</Link></li>
                </ul>
            </nav>
            <div className="user-info">
                <div className="user-name" onClick={handleMenuToggle} ref={userRef}>
                    {user.username || 'Cargando...'}
                    {isMenuOpen && (
                        <div className="user-menu" style={menuStyle}>
                            <button onClick={handleEditUser}>Editar usuario</button>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;


