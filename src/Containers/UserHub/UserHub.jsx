import { connect } from "react-redux";
import { LOGOUT } from "../../redux/types";
import { Link } from "react-router-dom";
import Logo from "../../img/logo-black.png";

const UserHub = (props) => {
  const creds = props.credentials.user;

  const logOut = () => {
    props.dispatch({ type: LOGOUT });
  };

  if (props.credentials.token !== "") {
    return (
      <div className="main">
        <div className="userHub-container container">
          <div className="userHub">
            <div className="info">
              <img className="logo" src={Logo} alt="martha's accesorios" />
              {creds.firstName !== null ? (
                <h2>WELCOME {creds.firstName.toUpperCase()}</h2>
              ) : (
                <h2>WELCOME</h2>
              )}
            </div>
            <div className="menu">
              <div>
                <i className="fa fa-user"></i>
                <Link className="links" to="/profile">
                  PERFIL
                </Link>
              </div>
              <div>
                <i className="fa fa-envelope"></i>
                <Link className="links" to="/messages">
                  MENSAJES
                </Link>
              </div>
              <div>
                <i className="fa fa-shopping-bag"></i>
                <Link className="links" to="/orders">
                  PEDIDOS
                </Link>
              </div>
              <div>
                <i className="fa fa-heart" aria-hidden="true"></i>
                <Link className="links" to="/wishlist">
                  FAVORITOS
                </Link>
              </div>
              <div>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <Link to="/" className="links" onClick={logOut}>
                  CERRAR SESIÓN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="userHub-container container">
          <div className="userHub">
            <img className="logo" src={Logo} alt="martha's accesorios" />
            <p>DEBES INICIAR SESIÓN PARA VER TU PERFIL</p>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(UserHub);
