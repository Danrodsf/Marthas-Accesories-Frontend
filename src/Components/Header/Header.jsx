import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

const Header = () => {
  const [click, setClick] = useState(false);
  const [width, setWidth] = useState();

  const clickHandler = () => setClick(!click);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    if (width >= 500) {
      setClick(false);
    }
  }, [width]);

  return (
    <div className="nav">
      <div className="nav-container container ">
        <div>
          <Link to="/">
            <img className="nav-logo" src={logo} alt="Martha's Accesories" />
          </Link>
        </div>
        <div className="menu-icon" onClick={clickHandler}>
          {click ? <i class="fa fa-times"></i> : <i class="fa fa-bars"></i>}
        </div>
        <div className={click ? "nav-menu active" : "nav-menu"}>
          <div className="nav-item">
            <Link to="/" className="nav-links" onClick={clickHandler}>
              Home
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/" className="nav-links" onClick={clickHandler}>
              Prendas
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/" className="nav-links" onClick={clickHandler}>
              Personaliza
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/" className="nav-links" onClick={clickHandler}>
              Iniciar sesión
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/" className="nav-links" onClick={clickHandler}>
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
