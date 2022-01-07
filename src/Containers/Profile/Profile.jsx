import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { UPDATE_USER } from "../../redux/types";
import FormInput from "../../Components/FormInput/FormInput";
import Button from "../../Components/Button/Button";
import axios from "axios";
import Logo from "../../img/logo-black.png";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  let navigate = useNavigate();

  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const [creds, setCreds] = useState(props.credentials.user);
  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
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
      id: creds.id,
      firstName: creds.firstName,
      lastName: creds.lastName,
      age: creds.age,
      address: creds.address,
      phone: creds.phone,
    };

    try {
      const res = await axios.put(
        `https://drs-marthas-accesories.herokuapp.com/user/update`,
        body,
        token
      );
      setmsgError(res.data.message);
      setTimeout(() => {
        props.dispatch({ type: UPDATE_USER, payload: creds });
        navigate("/userHub");
      }, 1000);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR ACTUALIZAR DATOS ");
      console.log(creds);
      return;
    }
  };

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "NOMBRE",
      value: "",
      errorMessage:
        "NOMBRE DEBE DE CONTENER SOLO LETRAS Y ENTRE 3 Y 20 CARACTERES",
      label: "NOMBRE",
      pattern: "^[A-Za-z]{3,20}$",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "APELLIDOS",
      value: "",
      errorMessage:
        "APELLIDOS DEBE DE CONTENER SOLO LETRAS Y ENTRE 3 Y 50 CARACTERES",
      label: "APELLIDOS",
      pattern: "^[A-Za-z ]{3,50}$",
      required: true,
    },
    {
      id: 3,
      name: "age",
      type: "number",
      placeholder: "EDAD",
      value: 0,
      label: "EDAD",
      min: 18,
      max: 99,
      errorMessage: "EDAD DEBE DE SER ENTRE 18 Y 99 AÑOS",
      required: true,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "DIRECCIÓN",
      value: "",
      errorMessage: "DIRECCIÓN DEBER CONTENER ENTRE 5 Y 50 CARACTERES",
      label: "DIRECCIÓN",
      pattern: "^[A-Za-z0-9 .,-]{5,50}$",
      required: true,
    },
    {
      id: 5,
      name: "phone",
      type: "text",
      placeholder: "TELEFONO",
      value: "",
      errorMessage: "TELÉFONO DEBE DE CONTENER 9 DÍGITOS ",
      label: "TELEFONO",
      pattern: "^[0-9]{9}$",
      required: true,
    },
  ];

  if (props.credentials.token !== "") {
    return (
      <div className="main">
        <div className="profile-container container">
          <div className="profile">
            <h2>PERFIL</h2>
            <p className="description">
              EDITA TUS DATOS PULSANDO SOBRE CADA UNO, AL RELLENAR TODO, GUARDA
              PRESIONANDO EL BOTÓN EDITAR
            </p>
            <form className="form" onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={creds[input.name]}
                  onChange={inputHandler}
                />
              ))}
              <Button text="EDITAR"></Button>
              <div className="error sm">{msgError}</div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="profile-container container">
          <div className="profile">
            <img className="logo" src={Logo} alt="martha's accesorios" />
            <p>DEBE INICIAR SESIÓN PARA VER SU PERFIL</p>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Profile);
