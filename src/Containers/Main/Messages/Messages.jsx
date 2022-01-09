import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import Logo from "../../../img/logo-black.png";

const Messages = (props) => {
  const token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const creds = props.credentials.user;
  const [messages, setMessages] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getByUserId(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
  };

  const getByUserId = async () => {
    const body = {
      userId: creds.id,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/message/getByUser`,
        body,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`NO SE HA ENCONTRADO NINGÚN MENSAJE`);
      } else {
        setMessages(res.data);
      }
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO NINGÚN MENSAJE");
    }
  };

  if (props.credentials.token !== "") {
    return (
      <div className="main">
        <div className="messages-container container">
          <div className="messages">
            <h1>MENSAJES</h1>
            <p>
              AQUÍ PUEDES REVISAR LOS MENSAJES QUE HAS ENVIADO A UN
              ADMINISTRADOR Y LAS RESPUESTAS RECIBIDAS DE LOS MISMOS.
            </p>
            <div>
              {messages.map((message) => {
                return (
                  <div key={message.id} className="messages-grid">
                    <p>FECHA DEL MENSAJE:</p>
                    <p>{formatDate(message?.createdAt)}</p>
                    <p>MENSAJE:</p>
                    <p>{message?.message.toUpperCase()}</p>
                    <p>FECHA DE RESPUESTA:</p>
                    <p>
                      {message?.updatedAt === message?.createdAt
                        ? "SIN RESPUESTA"
                        : ` ${formatDate(message?.updatedAt)}`}
                    </p>
                    <p>RESPUESTA:</p>
                    <p>
                      {message?.response === null
                        ? "SIN RESPUESTA"
                        : `${message?.response.toUpperCase()}`}
                    </p>
                  </div>
                );
              })}
              {msgError}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="messages-container container">
          <div className="messages">
            <img className="logo" src={Logo} alt="martha's accesorios" />
            <p>DEBES INICIAR SESION PARA VER TUS MENSAJES</p>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Messages);
