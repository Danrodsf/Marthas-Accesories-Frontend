import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LOGIN } from "../../redux/types";
import FormInput from "../../Components/FormInput/FormInput";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";

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
    setmsgError("");
    let body = {
      email: creds.email,
      password: creds.password,
    };

    try {
      const res = await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/user/signIn",
        body
      );
      if (res.data.user.firstName !== null) {
        setmsgError(`HEY! ${res.data.user.firstName.toUpperCase()}`);
      } else {
        setmsgError(`HEY! BIENVENIDX`);
      }
      props.dispatch({ type: LOGIN, payload: res.data });
      setTimeout(() => {
        navigate("/userHub");
      }, 2000);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR INICIAR TU SESIÓN");
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
      placeholder: "EMAIL",
      value: "",
      errorMessage: "EMAIL DEBE SER UNA DIRECCIÓN VALIDA.",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "CONTRASEÑA",
      value: "",
      errorMessage: "CONTRASEÑA DEBERIA CONTENER ENTRE 4 Y 20 CARACTERES.",
      pattern: "^.{4,20}$",
      required: true,
    },
  ];

  return (
    <div className="main">
      <div className="signIn-container container">
        <div className="signIn">
          <h2>INICIAR SESIÓN</h2>
          <form className="form" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={creds[input.name]}
                onChange={inputHandler}
              />
            ))}
            <Button text="INICIA SESIÓN"></Button>
            <div className="signUp-link">
              <p>NO TIENES UNA CUENTA?</p>
              <Link to="/signUp">REGÍSTRATE</Link>
            </div>
          </form>
          <div className="error">{msgError}</div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(SignIn);
