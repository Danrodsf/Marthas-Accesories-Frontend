import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../../img/logo-black.png";

function Main(props) {
  const navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();
  const [messages, setMessages] = useState();
  const [msgError, setmsgError] = useState();

  useEffect(() => {
    if (!props.admin.admin.firstName) {
      navigate("/admin");
    }
    getAllClients();
    getAllOrders();
    getAllProducts();
    getAllMessages(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllClients = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/user/",
        token
      );
      setClients(res.data);
    } catch (error) {
      setmsgError(error.message);
    }
  };

  const getAllOrders = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/order/",
        token
      );
      setOrders(res.data);
    } catch (error) {
      setmsgError(error.message);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/product/",
        token
      );
      setProducts(res.data);
    } catch (error) {
      setmsgError(error.message);
    }
  };

  const getAllMessages = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/message/",
        token
      );
      setMessages(res.data);
    } catch (error) {
      setmsgError(error.message);
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-main-container">
        <img src={Logo} alt="Martha's Accesorios" className="logo" />
        <h3>PANEL DE ADMINISTRADOR</h3>
        <div className="admin">
          <div className="clients">
            <p>TOTAL CLIENTES: </p>
            <p>{clients?.length}</p>
          </div>
          <div className="orders">
            <p>TOTAL PEDIDOS: </p>
            <p>{orders?.length}</p>
          </div>
          <div className="products">
            <p>TOTAL PRODUCTOS: </p>
            <p>{products?.length}</p>
          </div>
          <div className="messages">
            <p>TOTAL MENSAJES: </p>
            <p>{messages?.length}</p>
          </div>
        </div>
        {msgError}
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(Main);
