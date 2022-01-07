import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useLocation } from "react-router";

const Footer = (props) => {
  let location = useLocation();

  const [click, setClick] = useState(false);
  const [width, setWidth] = useState();

  const clickHandler = () => setClick(!click);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    if (width >= 500) {
      setClick(false);
    }
  }, [width]);

  useEffect(() => {
    setClick(false);
  }, [location.pathname]);

  return (
    <div className="footer">
      <div className="footer-container container">
        <div className="menu-icon" onClick={clickHandler}>
          {click ? (
            <i className="fa fa-times"></i>
          ) : (
            <i className="fa fa-bars"></i>
          )}
        </div>
        <div className={click ? "nav-menu active" : "nav-menu"}>
          <div
            className={
              location.pathname === "/products" ? "nav-item active" : "nav-item"
            }
          >
            <Link to="/products" className="nav-links" onClick={clickHandler}>
              COLECCIÓN
            </Link>
          </div>
          <div
            className={
              location.pathname === "/contact" ? "nav-item active" : "nav-item"
            }
          >
            <Link to="/contact" className="nav-links" onClick={clickHandler}>
              CONTÁCTANOS
            </Link>
          </div>
        </div>
        <div className="footer-info">
          <a
            href="https://www.instagram.com/marthasaccesorios/"
            className="footer-links"
          >
            <i className="fa fa-instagram"></i>
          </a>
          <div className="copyright sm">
            <p>© 2021, MARTHA'S ACCESORIOS.</p>
            <p>
              WEB DISEÑADA POR:{" "}
              <a href="https://www.linkedin.com/in/danielrodriguezserafin/">
                DANIEL RODRIGUEZ
              </a>
            </p>
          </div>
          <a href="mailto:mrthcst12@gmail.com" className="footer-links">
            <i className="fa fa-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Footer);
