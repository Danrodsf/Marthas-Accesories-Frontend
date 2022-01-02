import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../Components/Button/Button";

const Contact = (props) => {
  let navigate = useNavigate();

  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const [message, setMessage] = useState("");
  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = async () => {
    setmsgError("");
    let body = {
      message: message,
    };

    try {
      await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/message/create",
        body,
        token
      );
      setmsgError("MENSAJE ENVIADO CON ÉXITO");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR ENVIAR EL MENSAJE");
      console.log(message);
    }
  };

  return (
    <div className="main">
      <div className="message-container container">
        <form className="message" onSubmit={handleSubmit}>
          <h1>Contáctanos</h1>
          <p className="description">
            AQUÍ PODRÁS CONTACTARNOS, EN LA MAYOR BREVEDAD POSIBLE TE DAREMOS
            RESPUESTA, PUEDES REVISAR LOS MENSAJES ENVIADOS Y NUESTRAS
            RESPUESTAS EN TU <Link to="/messages">SECCIÓN DE MENSAJES</Link>
          </p>
          <textarea
            className="text md"
            placeholder="TU MENSAJE"
            onChange={inputHandler}
          />
          <Button text="ENVIAR"></Button>
          <div className="error">{msgError}</div>
        </form>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Contact);
