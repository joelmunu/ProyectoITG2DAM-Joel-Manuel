import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Header.css";
const Header = () => {
  return (
    <div className="HeaderContainer">
      <div className="headerContent">
        <span className="title">Rent a car Tenerife 🏎️</span>
        <a href="/VistaGeneral">Vista General</a>
        <a href="/VistaGeneral">Vehiculos</a>
        <a href="/VistaGeneral">Clientes</a>
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
