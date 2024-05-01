import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
const Header = () => {
  return (
    <div className="HeaderContainer">
      <div className="headerContent">
        <span className="title">Rent a car Tenerife 🏎️</span>
        <Link to="/VistaGeneral">Vista General</Link>
        <Link to="/Vehiculos">Vehiculos</Link>
        <Link to="/Clientes">Clientes</Link>
        <div>
          <span className="title">Admin</span>
          <button className="logout-btn">
            <FontAwesomeIcon icon={faRightFromBracket} className="color-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
