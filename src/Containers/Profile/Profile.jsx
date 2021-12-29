import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { UPDATE_USER } from "../../redux/types";
import axios from "axios";

const Profile = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const [creds, setCreds] = useState(props.credentials.user);
  const [msgError, setmsgError] = useState("");

  const profileHandler = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update();
  };

  useEffect(() => {
    setCreds(props.credentials.user);
  }, [props.credentials]);

  const update = async () => {
    let body = {
      firstName: creds.firstName,
      lastName: creds.lastName,
      age: creds.age,
      address: creds.address,
      phone: creds.phone,
      email: creds.email,
      password: creds.password,
      confirmPassword: creds.confirmPassword,
    };

    try {
      let res = await axios.put(
        `https://drs-marthas-accesories.herokuapp.com/user/`,
        body,
        token
      );
      setmsgError(res.data.message);
      setTimeout(() => {
        props.dispatch({ type: UPDATE_USER, payload: creds });
      }, 1000);
    } catch (error) {
      setmsgError("Hubo un error al intentar actualizar datos");
      return;
    }
  };

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
  };

  const edit = (info) => {
    switch (info) {
      case "firstName":
        break;

      default:
        break;
    }
  };

  if (props.credentials.token !== "") {
    return (
      <div className="main">
        <div className="profile-container container">
          <div className="profile">
            <h3>Tu perfil</h3>
            <div className="profile-info">
              <p>Nombre:</p>
              {props.credentials.user.firstName}
              <button onClick={edit("firstName")}>Editar</button>
            </div>
            <div className="profile-info">
              <p>Apellido:</p>
              {props.credentials.user.lastName}
              <button onClick={edit("lastName")}>Editar</button>
            </div>
            <div className="profile-info">
              <p>Edad:</p>
              {props.credentials.user.age}
              <button onClick={edit("age")}>Editar</button>
            </div>
            <div className="profile-info">
              <p>Dirección:</p>
              {props.credentials.user.address}
              <button onClick={edit("address")}>Editar</button>
            </div>
            <div className="profile-info">
              <p>Teléfono</p>
              {props.credentials.user.phone}
              <button onClick={edit("phone")}>Editar</button>
            </div>
            <div className="profile-info">
              <p>Miembro desde:</p>
              {formatDate(props.credentials.user.createdAt)}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>No estas logueado</div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Profile);
