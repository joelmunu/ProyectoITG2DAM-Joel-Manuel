import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
// Define a functional component called Header

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  // Render the header content based on login status

  return (
    <div className="HeaderContainer">
      <div className="headerContent">
        <span className="title">Rent a car Tenerife 🏎️</span>
        {isLoggedIn ? (
          <>
            <Link to="/VistaGeneral">Vista General</Link>
            <Link to="/Vehiculos">Vehiculos</Link>
            <Link to="/Clientes">Clientes</Link>
            <span className="title-admin">Admin</span>
            <div>
              <button
                className="logout-btn"
                onClick={() => setIsLoggedIn(false)}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="color-icon"
                />
              </button>
            </div>
          </>
        ) : (
          <span className="title">Bienvenido</span>
        )}
      </div>
    </div>
  );
};

export default Header;
