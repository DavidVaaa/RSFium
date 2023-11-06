import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { useAuth } from '../AuthContext';
import Header from '../components/header';
import './EditarUsuario.css';

function EditarUsuario() {
    const { user } = useAuth();
    const [userData, setUserData] = useState({
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        rol: '',
        phone_number: '',
        instagram: '',
        twitter: '',
        linkedin: '',
    });

    useEffect(() => {
        axios.get(`/api/customusers/${user.userId}`)
            .then(response => {
                const user = response.data;
                setUserData(user);
            })
            .catch(error => {
                console.error('Error al obtener los datos del usuario', error);
            });
    }, [user.userId]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        axios.put(`/api/users/update/${user.userId}/`, userData)
            .then(response => {
                console.log('Datos actualizados con éxito');
            })
            .catch(error => {
                console.error('Error al actualizar los datos del usuario', error);
            });
    };

    return (
        <div id="editar-usuario-page">
            <Header />
            <div className="usuario-info">
                <h2 id="title">Editar Usuario</h2>
                <div>
                    <p><strong>Nombre de usuario:</strong> {userData.username}</p>
                    <p><strong>Nombre:</strong> {userData.first_name} {userData.last_name}</p>
                    <p><strong>Correo electrónico:</strong> {userData.email}</p>
                    <p><strong>Rol:</strong> {userData.rol}</p>
                </div>
            </div>
            <div className="formulario">
                <form onSubmit={handleFormSubmit}>
                    <div className="form-row">
                        <label htmlFor="phone_number">Celular:</label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={userData.phone_number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="instagram">Instagram:</label>
                        <input
                            type="text"
                            id="instagram"
                            name="instagram"
                            value={userData.instagram}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="twitter">Twitter:</label>
                        <input
                            type="text"
                            id="twitter"
                            name="twitter"
                            value={userData.twitter}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <label htmlFor="linkedin">LinkedIn:</label>
                        <input
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            value={userData.linkedin}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
}

export default EditarUsuario;

