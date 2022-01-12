import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MessageDetails(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [message, setMessage] = useState(location.state);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState();
  const [msgError, setmsgError] = useState("");

  const clickHandler = () => {
    setEdit(!edit);
  };

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

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

  const editMessage = async () => {
    const body = {
      id: message.id,
      userId: input.userId,
      message: input.message,
      adminId: input.adminId,
      response: input.response,
    };
    try {
      await axios.put(
        `https://drs-marthas-accesories.herokuapp.com/message/update`,
        body,
        token
      );
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/message/getById`,
        body,
        token
      );
      setMessage(res.data[0]);
      setEdit(false);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL EDITAR EL MENSAJE");
    }
  };

  const removeMessage = async () => {
    const body = {
      id: message.id,
    };
    try {
      await axios({
        method: "delete",
        url: "https://drs-marthas-accesories.herokuapp.com/message/delete",
        data: body,
        headers: {
          Authorization: `Bearer ${props.admin.token}`,
        },
      });
      navigate("/admin/Messages");
    } catch (error) {
      setmsgError(error.message);
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-messageDetails-container">
        <div className="admin-messageDetails">
          <div className="message">
            <div className="messageDetails">
              <div className="messageDetails-title">
                <h3>DATOS DEL MENSAJE: </h3>
                <div className="btn" onClick={removeMessage}>
                  <i className="fa fa-minus-square"></i>
                  <p>ELIMINAR</p>
                </div>
                <div className="btn" onClick={clickHandler}>
                  <i className="fa fa-pencil-square-o"></i>
                  <p>EDITAR</p>
                </div>
                {edit ? (
                  <div className="btn" onClick={editMessage}>
                    <i className="fa fa-check-square-o"></i>
                    <p>ENVIAR</p>
                  </div>
                ) : null}
              </div>
              <h3>DETALLES DEL MENSAJE</h3>
              <div className="grid">
                <p>ID DEL MENSAJE: </p>
                <p>{message.id}</p>
                <p>ID USUARIO: </p>
                {edit ? (
                  <input
                    type="number"
                    name="userId"
                    onChange={inputHandler}
                    placeholder={message.userId}
                  ></input>
                ) : (
                  <p>{message.userId}</p>
                )}
                <p>MENSAJE: </p>
                {edit ? (
                  <input
                    type="text"
                    name="message"
                    onChange={inputHandler}
                    placeholder={message.message?.toUpperCase()}
                  ></input>
                ) : (
                  <p>{message.message?.toUpperCase()}</p>
                )}
                <p>ID ADMIN: </p>
                {edit ? (
                  <input
                    type="number"
                    name="adminId"
                    onChange={inputHandler}
                    placeholder={message.adminId}
                  ></input>
                ) : (
                  <p>{message.adminId}</p>
                )}
                <p>RESPUESTA: </p>
                {edit ? (
                  <input
                    type="text"
                    name="response"
                    onChange={inputHandler}
                    placeholder={message.response?.toUpperCase()}
                  ></input>
                ) : (
                  <p>{message.response?.toUpperCase()}</p>
                )}
                <p>FECHA ENVIADO: </p>
                <p>{message.createdAt?.substring(0, 10)}</p>
                <p>FECHA RESPUESTA: </p>
                <p>{message.updatedAt?.substring(0, 10)}</p>
              </div>
            </div>
            {msgError}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(MessageDetails);
