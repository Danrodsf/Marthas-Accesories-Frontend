import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ClientDetails(props) {
  const location = useLocation();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [client, setClient] = useState(location.state);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const body = {
      id: client.id,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/user/getById`,
        body,
        token
      );
      setClient(res.data);
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO EL USUARIO");
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
      <div className="admin-clientDetails-container">
        <div className="admin-clientDetails">
          <div className="client">
            <div className="clientDetails">
              <h3>DATOS DEL CLIENTE: </h3>
              <div className="grid">
                <p>ID DE CLIENTE: </p>
                <p>{client.id}</p>
                <p>NOMBRE: </p>
                <p>{client.firstName?.toUpperCase()}</p>
                <p>APELLIDOS: </p>
                <p>{client.lastName?.toUpperCase()}</p>
                <p>EDAD: </p>
                <p>{client.age}</p>
                <p>DIRECCIÓN: </p>
                <p>{client.address?.toUpperCase()}</p>
                <p>TELÉFONO: </p>
                <p>{client.phone}</p>
                <p>EMAIL: </p>
                <p>{client.email?.toUpperCase()}</p>
                <p>FECHA ALTA: </p>
                <p>{formatDate(client.createdAt)}</p>
                <p>FECHA ÚLTIMA ACTUALIZACIÓN: </p>
                <p>{formatDate(client.updatedAt)}</p>
              </div>
            </div>
          </div>
          <div className="orders">
            <div className="orderDetails">
              <h3>PEDIDOS</h3>
              <table className="detailTable">
                <thead>
                  <tr>
                    <th>ID: </th>
                    <th>ID USUARIO: </th>
                    <th>CANTIDAD: </th>
                    <th>ENVIO: </th>
                    <th>ESTADO: </th>
                    <th>FECHA ALTA: </th>
                    <th>FECHA ACT.: </th>
                  </tr>
                </thead>
                {client.Orders?.map((order) => {
                  return (
                    <tbody className="a" key={order.id}>
                      <tr>
                        <td>{order.id}</td>
                        <td>{order.userId}</td>
                        <td>{order.ammount}</td>
                        <td>{order.shipping}</td>
                        <td>{order.status?.toUpperCase()}</td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>{formatDate(order.updatedAt)}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="messages">
            <div className="messageDetails">
              <h3>MENSAJES</h3>
              <table className="detailTable">
                <thead>
                  <tr>
                    <th>ID: </th>
                    <th>ID USUARIO: </th>
                    <th>MENSAJE: </th>
                    <th>ID ADMIN: </th>
                    <th>RESPUESTA: </th>
                    <th>FECHA ALTA: </th>
                    <th>FECHA ACT.: </th>
                  </tr>
                </thead>
                {client.Messages?.map((message) => {
                  return (
                    <tbody className="a" key={message.id}>
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
          <div className="wishlist">
            <div className="wishlistDetails">
              <h3>FAVORITOS</h3>
              <table className="detailTable">
                <thead>
                  <tr>
                    <th>ID: </th>
                    <th>ID USUARIO: </th>
                    <th>ID PRODUCTO: </th>
                    <th>FECHA ALTA: </th>
                    <th>FECHA ACT.: </th>
                  </tr>
                </thead>
                {client.Wishlists?.map((product) => {
                  return (
                    <tbody className="a" key={product.id}>
                      <tr>
                        <td>{product.id}</td>
                        <td>{product.userId}</td>
                        <td>{product.productId}</td>
                        <td>{formatDate(product.createdAt)}</td>
                        <td>{formatDate(product.updatedAt)}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(ClientDetails);
