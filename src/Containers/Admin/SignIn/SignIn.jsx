import { useState } from "react";
import { connect } from "react-redux";
import { ADMIN_LOGIN } from "../../../redux/types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../../../Components/FormInput/FormInput";
import Button from "../../../Components/Button/Button";

function SignIn(props) {
  const navigate = useNavigate();
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
        "https://drs-marthas-accesories.herokuapp.com/admin/signIn",
        body
      );
      props.dispatch({ type: ADMIN_LOGIN, payload: res.data });
      setmsgError("BIENVENID@");
      setTimeout(() => {
        navigate("/admin/main");
      }, 1000);
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
    <div className="admin-main">
      <div className="signIn-container container">
        <h2>PANEL DE ADMINISTRADOR</h2>
        <div className="signIn">
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
            <div className="error sm">{msgError}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(SignIn);
