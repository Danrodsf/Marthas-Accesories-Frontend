import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

function Messages(props) {
  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [messages, setMessages] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getAllMessages();
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

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
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
                <tbody className="messages-table-data" key={message.id}>
                  <tr>
                    <td>{message.id}</td>
                    <td>{message.userId}</td>
                    <td>{message.message?.toUpperCase()}</td>
                    <td>{message.adminId}</td>
                    <td>{message.response?.toUpperCase()}</td>
                    <td>{formatDate(message.createdAt)}</td>
                    <td>{formatDate(message.updatedAt)}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(Messages);
