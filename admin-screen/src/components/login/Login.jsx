import React, { useState } from "react";
import "../../styles/Login.css";
import { adminLogin } from "../../services/auth.service"; // Ajusta la importación según sea necesario

const Login = ({ handleLogin }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    await handleLogin(email, password);
  };

  return (
    <div className="containera">
      <div className="column">
        <h1>Inicio de sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="text" name="email" className="input-field" />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" name="password" className="input-field" />
          </div>
          <button type="submit" className="custom-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;