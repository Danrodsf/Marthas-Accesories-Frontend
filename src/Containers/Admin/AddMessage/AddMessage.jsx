import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import FormInput from "../../../Components/FormInput/FormInput";
import Button from "../../../Components/Button/Button";

function AddMessage(props) {
  let navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [message, setMessage] = useState({
    userId: "",
    message: "",
    adminId: "",
    response: "",
  });

  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const addMessage = async () => {
    setmsgError("");
    let body = {
      userId: message.userId,
      message: "",
      adminId: message.adminId,
      response: message.response,
    };

    try {
      await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/message/create",
        body,
        token
      );
      setmsgError("MENSAJE CREADO");
      setTimeout(() => {
        navigate("/admin/Messages");
      }, 2000);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR AÑADIR EL MENSAJE");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage();
  };

  return (
    <div className="admin-main">
      <div className="admin-addMessage-container container">
        <div className="admin-addMessage">
          <h2>CREAR MENSAJE</h2>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="number"
              name="userId"
              placeholder="ID USUARIO"
              onChange={inputHandler}
            />
            <input
              type="number"
              name="adminId"
              placeholder="ID ADMINISTRADOR"
              onChange={inputHandler}
            />
            <textarea
              name="response"
              rows="10"
              onChange={inputHandler}
              placeholder="MENSAJE"
            ></textarea>
            <Button text="CREAR MENSAJE"></Button>
            <div className="error sm">{msgError}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(AddMessage);
