import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";

const SignUp = () => {
  let navigate = useNavigate();

  const [creds, setCreds] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const reg = async () => {
    setmsgError("");
    let body = {
      email: creds.email,
      password: creds.password,
    };

    try {
      await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/user/signup",
        body
      );
      setmsgError("Registro exitoso");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setmsgError("Hubo un error al intentar registrarte");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reg();
  };

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      value: "",
      errorMessage: "Email de de ser una dirección valida",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      value: "",
      errorMessage: "Contraseña deberia de contener entre 4 y 20 caracteres",
      pattern: "^.{4,20}$",
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Repetir Contraseña",
      value: "",
      errorMessage: "las contraseñas no coinciden",
      pattern: creds.password,
      required: true,
    },
  ];

  return (
    <div className="main">
      <div className="signUp-container container">
        <div className="signUp">
          <h2>Regístrate</h2>
          <form className="form" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={creds[input.name]}
                onChange={inputHandler}
              />
            ))}
            <button className="button">Regístrate</button>
          </form>
          <div>{msgError}</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
