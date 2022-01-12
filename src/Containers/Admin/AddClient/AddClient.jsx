import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../Components/FormInput/FormInput";
import Button from "../../../Components/Button/Button";

function AddClient() {
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
    setmsgError("");
    let body = {
      firstName: creds.firstName,
      lastName: creds.lastName,
      age: creds.age,
      address: creds.address,
      phone: creds.phone,
      email: creds.email,
      password: creds.password,
    };

    try {
      await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/user/signup",
        body
      );
      setmsgError("REGISTRO EXITOSO");
      setTimeout(() => {
        navigate("/admin/clients");
      }, 2000);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR REGISTRARTE");
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
      placeholder: "NOMBRE",
      value: "",
      errorMessage:
        "NOMBRE DEBE DE CONTENER SOLO LETRAS Y ENTRE 3 Y 20 CARACTERES",
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
      pattern: "^[A-Za-z ]{3,50}$",
      required: true,
    },
    {
      id: 3,
      name: "age",
      type: "number",
      placeholder: "EDAD",
      value: 0,
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
      pattern: "^[0-9]{9}$",
      required: true,
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "EMAIL",
      value: "",
      errorMessage: "EMAIL DEBE SER UNA DIRECCIÓN VALIDA",
      required: true,
    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "CONTRASEÑA",
      value: "",
      errorMessage: "CONTRASEÑA DEBERIA CONTENER ENTRE 4 Y 20 CARACTERES",
      pattern: "^.{4,20}$",
      required: true,
    },
    {
      id: 8,
      name: "confirmPassword",
      type: "password",
      placeholder: "REPETIR CONTRASEÑA",
      value: "",
      errorMessage: "LAS CONTRASEÑAS NO COINCIDEN",
      pattern: creds.password,
      required: true,
    },
  ];

  return (
    <div className="admin-main">
      <div className="admin-addClient-container container">
        <div className="admin-addClient">
          <h2>AÑADIR CLIENTE</h2>
          <form className="form" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={creds[input.name]}
                onChange={inputHandler}
              />
            ))}
            <Button text="AÑADIR CLIENTE"></Button>
            <div className="error sm">{msgError}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClient;
