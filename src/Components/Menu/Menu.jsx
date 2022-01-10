import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../redux/types";
import { useLocation } from "react-router";

function Menu(props) {
  const navigate = useNavigate();
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

  const logOut = () => {
    props.dispatch({ type: LOGOUT });
    navigate("/admin");
  };

  useEffect(() => {
    setClick(false);
  }, [location.pathname]);

  return (
    <div className="menu">
      <div className="admin-menu-icon" onClick={clickHandler}>
        {click ? (
          <i className="fa fa-times"></i>
        ) : (
          <i className="fa fa-bars"></i>
        )}
      </div>
      <div className={click ? "menu-content active" : "menu-content"}>
        <p className="logOut" onClick={() => navigate("/admin/main")}>
          INICIO
        </p>
        <p className="logOut" onClick={() => navigate("/admin/clients")}>
          CLIENTES
        </p>
        <p className="logOut" onClick={() => navigate("/admin/orders")}>
          PEDIDOS
        </p>
        <p className="logOut" onClick={() => navigate("/admin/products")}>
          PRODUCTOS
        </p>
        <p className="logOut" onClick={() => navigate("/admin/messages")}>
          MENSAJES
        </p>
        <p className="logOut" onClick={logOut}>
          SALIR
        </p>
      </div>
    </div>
  );
}

export default connect((state) => ({
  credentials: state.credentials,
}))(Menu);
