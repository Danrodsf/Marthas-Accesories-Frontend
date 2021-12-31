import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";

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
      setmsgError("REGISTRO EXITOSO");
      setTimeout(() => {
        navigate("/");
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
      name: "email",
      type: "email",
      placeholder: "Email",
      value: "",
      errorMessage: "EMAIL DEBE SER UNA DIRECCIÓN VALIDA",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      value: "",
      errorMessage: "CONTRASEÑA DEBERIA CONTENER ENTRE 4 Y 20 CARACTERES",
      pattern: "^.{4,20}$",
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Repetir Contraseña",
      value: "",
      errorMessage: "LAS CONTRASEÑAS NO COINCIDEN",
      pattern: creds.password,
      required: true,
    },
  ];

  return (
    <div className="main">
      <div className="signUp-container container">
        <div className="signUp">
          <h2>REGÍSTRATE</h2>
          <form className="form" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={creds[input.name]}
                onChange={inputHandler}
              />
            ))}
            <Button text="REGÍSTRATE"></Button>
            <div className="signIn-link">
              <p>YA TIENES UNA CUENTA?</p>
              <Link to="/signIn">INICIA SESIÓN</Link>
            </div>
          </form>
          <div className="error">{msgError}</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
