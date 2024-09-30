import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () =>{
    return(
        <div className="text-center ">
    <div className="not-found-container">
      <h1>404</h1>
      <p>¡Oops! A no ser de una maquina de tiempo, imposible volver.</p>
      <Link to="/" className="home-link">Volver al Inicio</Link>
    </div>
        </div>
    )
}

export default NotFound;