import "../../styles/Login.css";

const Login = ({ handleLogin }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    let valid = true;

    if (!email) {
      alert("El email es obligatorio");
      valid = false;
    }

    if (!password) {
      alert("La contraseña es obligatoria");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      await handleLogin(email, password);
    } catch (error) {
      if (error.message === "Usuario o contraseña incorrectos") {
        alert("Email o contraseña incorrectos");
      } else {
        alert(
          "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo."
        );
      }
    }
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
          <button type="submit" className="custom-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
