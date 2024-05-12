import React from "react";
import "../../styles/Login.css";

const Login = () => {
  return (
    <div className="containera">
      <div className="column">
        <h1>Inicio de sesión</h1>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="text" className="input-field" />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="text" className="input-field" />
          </div>
          <button className="custom-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
