import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LOGOUT } from "../../redux/types";
import logo from "../../img/logo.png";

const Header = (props) => {
  const [click, setClick] = useState(false);
  const [width, setWidth] = useState();

  const clickHandler = () => setClick(!click);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    if (width >= 500) {
      setClick(false);
    }
  }, [width]);

  const logOut = () => {
    props.dispatch({ type: LOGOUT });
  };

  if (props.credentials.token !== "") {
    return (
      <div className="nav">
        <div className="nav-container container ">
          <div>
            <Link to="/">
              <img className="nav-logo" src={logo} alt="Martha's Accesories" />
            </Link>
          </div>
          <div className="menu-icon" onClick={clickHandler}>
            {click ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </div>
          <div className={click ? "nav-menu active" : "nav-menu"}>
            <div className="nav-item">
              <Link to="/shop" className="nav-links" onClick={clickHandler}>
                PRENDAS
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/customize"
                className="nav-links"
                onClick={clickHandler}
              >
                PERSONALIZA
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/contact" className="nav-links" onClick={clickHandler}>
                CONTÁCTANOS
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/cart" className="nav-links" onClick={clickHandler}>
                CARRITO
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/profile" className="nav-links" onClick={clickHandler}>
                PERFIL
              </Link>
            </div>
            <div className="nav-item">
              <div className="nav-links" onClick={logOut}>
                CERRAR SESIÓN
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="nav">
        <div className="nav-container container ">
          <div>
            <Link to="/">
              <img className="nav-logo" src={logo} alt="Martha's Accesories" />
            </Link>
          </div>
          <div className="menu-icon" onClick={clickHandler}>
            {click ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </div>
          <div className={click ? "nav-menu active" : "nav-menu"}>
            <div className="nav-item">
              <Link to="/shop" className="nav-links" onClick={clickHandler}>
                PRENDAS
              </Link>
            </div>
            <div className="nav-item">
              <Link
                to="/customize"
                className="nav-links"
                onClick={clickHandler}
              >
                PERSONALIZA
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/contact" className="nav-links" onClick={clickHandler}>
                CONTÁCTANOS
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/signIn" className="nav-links" onClick={clickHandler}>
                INICIA SESIÓN
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/signUp" className="nav-links" onClick={clickHandler}>
                REGÍSTRATE
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Header);
