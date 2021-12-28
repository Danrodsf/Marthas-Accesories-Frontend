import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN } from "../../redux/types";
import FormInput from "../../Components/FormInput/FormInput";

const SignIn = (props) => {
  let navigate = useNavigate();

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let body = {
      email: creds.email,
      password: creds.password,
    };

    try {
      const res = await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/user/signIn",
        body
      );
      setmsgError(`Hey! ${res.data.user.firstName}`);
      props.dispatch({ type: LOGIN, payload: res.data });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setmsgError("Hubo un error al intentar iniciar tu sesión");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      value: "",
      errorMessage: "Email de de ser una dirección valida",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      value: "",
      errorMessage: "Contraseña deberia de contener entre 4 y 20 caracteres",
      label: "Contraseña",
      pattern: "^.{4,20}$",
      required: true,
    },
  ];

  return (
    <div className="main">
      <div className="signIn-container container">
        <div className="signIn">
          <h3>Inicia tu sesión</h3>
          <form className="form" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={creds[input.name]}
                onChange={inputHandler}
              />
            ))}
            <button className="button">Enviar</button>
          </form>
          <div>{msgError}</div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(SignIn);
