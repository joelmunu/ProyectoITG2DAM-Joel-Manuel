import "../../styles/Header.css";
const Header = () => {
  return (
    <div className="HeaderContainer">
      <nav>
        <div className="header-content">
          <div className="left-section">
            <span className="title">Rent a car Tenerife 🏎️</span>
          </div>
          <div className="nav-links">
            <a href="/VistaGeneral">Vista General</a>
            <a href="/Vehiculos">vehiculos</a>
            <a href="/Clientes">Clientes</a>
          </div>
          <div className="right-section">
            <span className="title2">Admin</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
