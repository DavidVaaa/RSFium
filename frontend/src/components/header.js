import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../images/logo.png';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

function Header() {
    const { user } = useAuth();
    return (
        <header className="header">
            {/* <div className="logo">
                <img src={logo} alt="FIUMER Logo" className="logo" />
            </div> */}
            <nav className="nav">
                <ul>
                    <li><Link to="/home">Mis cursos</Link></li>
                    <li><Link to="/calendar">Calendario</Link></li>
                    <li><Link to="/debates">Debates</Link></li>
                </ul>
            </nav>
            <div className="user-info">
                {user && <span>{user.username}</span>}
            </div>
        </header>
    );
}

export default Header;
