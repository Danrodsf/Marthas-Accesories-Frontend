import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function MessageDetails(props) {
  const location = useLocation();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [message, setMessage] = useState(location.state);
  const [msgError, setmsgError] = useState("");

  console.log(location.state);

  useEffect(() => {
    getMessageById(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMessageById = async () => {
    const body = {
      id: message,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/message/getById`,
        body,
        token
      );
      setMessage(res.data[0]);
      console.log(res.data[0]);
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO EL MENSAJE");
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-messageDetails-container">
        <div className="admin-messageDetails">
          <div className="message">
            <h3>DETALLES DEL MENSAJE</h3>
            <div className="grid">
              <p>ID: </p>
              <p>{message?.id}</p>
              <p>ID DE USUARIO: </p>
              <p>{message?.userId}</p>
              <p>NOMBRE DEL USUARIO: </p>
              <p>
                {message?.User?.firstName?.toUpperCase()}
                {message?.User?.lastName?.toUpperCase()}
              </p>
              <p>MENSAJE: </p>
              <p>{message?.message?.toUpperCase()}€</p>
              <p>ID DEL ADMIN: </p>
              <p>{message?.adminId}</p>
              <p>RESPUESTA: </p>
              <p>{message?.response?.toUpperCase()}€</p>
              <p>FECHA ENVIADO: </p>
              <p>{message?.createdAt}</p>
            </div>
          </div>
          {msgError}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(MessageDetails);
