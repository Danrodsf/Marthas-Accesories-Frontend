import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Messages(props) {
  const navigate = useNavigate();
  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [messages, setMessages] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getAllMessages(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllMessages = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/message/",
        token
      );
      setMessages(res.data);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR OBTENER TODOS LOS CLIENTES");
    }
  };

  const viewMessage = (message) => {
    navigate("/admin/messageDetails", { state: message });
  };

  return (
    <div className="admin-main">
      <div className="admin-messages-container">
        <div className="admin-messages">
          <table className="table">
            <thead>
              <tr>
                <th>ID:</th>
                <th>ID USUARIO:</th>
                <th>MENSAJE:</th>
                <th>ID ADMIN:</th>
                <th>RESPUESTA:</th>
                <th>FECHA ALTA:</th>
                <th>FECHA ACT.:</th>
              </tr>
            </thead>
            {messages.map((message) => {
              return (
                <tbody
                  className="messages-table-data"
                  key={message.id}
                  onClick={() => viewMessage(message.id)}
                >
                  <tr>
                    <td>{message.id}</td>
                    <td>{message.userId}</td>
                    <td>{message.message?.toUpperCase()}</td>
                    <td>{message.adminId}</td>
                    <td>{message.response?.toUpperCase()}</td>
                    <td>{message.createdAt?.substring(0, 10)}</td>
                    <td>{message.updatedAt?.substring(0, 10)}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          {msgError}
          <div
            className="addMessage"
            onClick={() => navigate("/admin/addMessage")}
          >
            <i className="fa fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(Messages);
