import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

const Messages = (props) => {
  const token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const creds = props.credentials.user;
  const [messages, setMessages] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getByUserId();
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
      let res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/message/getByUser`,
        body,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`Messages not Found`);
      } else {
        setMessages(res.data);
      }
    } catch (error) {
      setmsgError("Message not found");
    }
  };

  return (
    <div className="main">
      <div className="messages-container container">
        <div className="messages">
          <h1>MENSAJES</h1>
          <p>
            AQUÍ PUEDES REVISAR LOS MENSAJES QUE HAS ENVIADO A UN ADMINISTRADOR
            Y LAS RESPUESTAS RECIBIDAS DE LOS MISMOS.
          </p>
        </div>
        <div>
          {messages.map((message) => {
            return (
              <div key={message.id} className="show-messages-container">
                <div className="messages-grid">
                  <p>Fecha del Mensaje:</p>
                  <p>{formatDate(message?.createdAt)}</p>
                  <p>Mensaje:</p>
                  <p>{message?.message}</p>
                  <p>Fecha de respuesta:</p>
                  <p>
                    {message?.updatedAt === message?.createdAt
                      ? "SIN RESPUESTA"
                      : ` ${formatDate(message?.updatedAt)}`}
                  </p>
                  <p>Respuesta:</p>
                  <p>
                    {message?.response === null
                      ? "SIN RESPUESTA"
                      : `${message?.response}`}
                  </p>
                </div>
              </div>
            );
          })}
          {msgError}
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Messages);
