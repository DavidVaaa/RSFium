import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../images/logo.png';


function Header() {

    return (
        <header className="header">
            {/* <div className="logo">
                <img src={logo} alt="FIUMER Logo" className="logo" />
            </div> */}
            <nav className="nav">
                <ul>
                    <li><a href="#">Mis cursos</a></li>
                    <li><a href="#">Calendario</a></li>
                    <li><a href="#">Debates</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
