import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="HeaderContainer">
      <div className="headerContent">
        <span className="title">Rent a car Tenerife 🏎️</span>
        {isLoggedIn ? (
          <>
            <Link to="/VistaGeneral">Vista General</Link>
            <Link to="/Vehiculos">Vehiculos</Link>
            <Link to="/Clientes">Clientes</Link>
            <div>
              <span className="title">Admin</span>
              <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
                <FontAwesomeIcon icon={faRightFromBracket} className="color-icon" />
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
