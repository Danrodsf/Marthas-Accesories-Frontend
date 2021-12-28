import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";

const Register = () => {
  let navigate = useNavigate();

  const [creds, setCreds] = useState({
    firstName: "",
    lastName: "",
    age: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const reg = async () => {
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
      name: "firstName",
      type: "text",
      placeholder: "Nombre",
      value: "",
      errorMessage:
        "Nombre debe de contener solo letras y entre 3 y 20 caracteres",
      label: "Nombre",
      pattern: "^[A-Za-z]{3,20}$",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Apellidos",
      value: "",
      errorMessage:
        "Apellidos debe de contener solo letras y entre 3 y 50 caracteres",
      label: "Apellidos",
      pattern: "^[A-Za-z ]{3,50}$",
      required: true,
    },
    {
      id: 3,
      name: "age",
      type: "number",
      placeholder: "Edad",
      value: "",
      label: "Edad",
      min: 18,
      max: 99,
      errorMessage: "Edad debe de ser entre 18 y 99 años",
      required: true,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Dirección",
      value: "",
      errorMessage: "Dirección deber contener entre 5 y 50 caracteres",
      label: "Dirección",
      pattern: "^[A-Za-z0-9 .,-]{5,50}$",
      required: true,
    },
    {
      id: 5,
      name: "phone",
      type: "text",
      placeholder: "Teléfono",
      value: "",
      errorMessage: "Teléfono debe de contener 9 dígitos",
      label: "Teléfono",
      pattern: "^[0-9]{9}$",
      required: true,
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "Email",
      value: "",
      errorMessage: "Email de de ser una dirección valida",
      label: "Email",
      required: true,
    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      value: "",
      errorMessage: "Contraseña deberia de contener entre 4 y 20 caracteres",
      label: "Contraseña",
      pattern: "^.{4,20}$",
      required: true,
    },
    {
      id: 8,
      name: "confirmPassword",
      type: "password",
      placeholder: "Repetir Contraseña",
      value: "",
      errorMessage: "las contraseñas no coinciden",
      label: "Repetir Contraseña",
      pattern: creds.password,
      required: true,
    },
  ];

  return (
    <div className="main">
      <div className="signUp-container container">
        <div className="signUp">
          <h3>Regístrate</h3>
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

export default Register;
