import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ClientDetails(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [client, setClient] = useState(location.state);
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
    getUserById(); //eslint-disable-next-line react-hooks/exhaustive-deps
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

  const editClient = async () => {
    const body = {
      id: client.id,
      firstName: input.firstName,
      lastName: input.lastName,
      age: input.age,
      address: input.address,
      phone: input.phone,
      email: input.email,
    };
    try {
      await axios.put(
        `https://drs-marthas-accesories.herokuapp.com/user/update`,
        body,
        token
      );
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/user/getById`,
        body,
        token
      );
      setClient(res.data);
      setEdit(false);
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO EL USUARIO");
    }
  };

  const removeClient = async () => {
    const body = {
      id: client.id,
    };
    try {
      await axios({
        method: "delete",
        url: "https://drs-marthas-accesories.herokuapp.com/user/delete",
        data: body,
        headers: {
          Authorization: `Bearer ${props.admin.token}`,
        },
      });
      navigate("/admin/clients");
    } catch (error) {
      setmsgError(error.message);
    }
  };

  const viewProduct = (product) => {
    navigate("/admin/productDetails", { state: product });
  };

  const viewOrder = (order) => {
    navigate("/admin/orderDetails", { state: order });
  };

  const viewMessage = (message) => {
    navigate("/admin/messageDetails", { state: message });
  };

  return (
    <div className="admin-main">
      <div className="admin-clientDetails-container">
        <div className="admin-clientDetails">
          <div className="client">
            <div>
              <div className="clientDetails">
                <h3>DATOS DEL CLIENTE: </h3>
                <div className="btn" onClick={removeClient}>
                  <i className="fa fa-minus-square"></i>
                  <p>ELIMINAR</p>
                </div>
                <div className="btn" onClick={clickHandler}>
                  <i className="fa fa-pencil-square-o"></i>
                  <p>EDITAR</p>
                </div>
                {edit ? (
                  <div className="btn" onClick={editClient}>
                    <i className="fa fa-check-square-o"></i>
                    <p>ENVIAR</p>
                  </div>
                ) : null}
              </div>
              <div className="grid">
                <p>ID DE CLIENTE: </p>
                <p>{client.id}</p>
                <p>NOMBRE: </p>
                {edit ? (
                  <input
                    type="text"
                    name="firstName"
                    onChange={inputHandler}
                    placeholder={client.firstName?.toUpperCase()}
                  ></input>
                ) : (
                  <p>{client.firstName?.toUpperCase()}</p>
                )}
                <p>APELLIDOS: </p>
                {edit ? (
                  <input
                    type="text"
                    name="lastName"
                    onChange={inputHandler}
                    placeholder={client.lastName?.toUpperCase()}
                  ></input>
                ) : (
                  <p>{client.lastName?.toUpperCase()}</p>
                )}
                <p>EDAD: </p>
                {edit ? (
                  <input
                    type="number"
                    name="age"
                    onChange={inputHandler}
                    placeholder={client.age}
                  ></input>
                ) : (
                  <p>{client.age}</p>
                )}
                <p>DIRECCIÓN: </p>
                {edit ? (
                  <input
                    type="text"
                    name="address"
                    onChange={inputHandler}
                    placeholder={client.address?.toUpperCase()}
                  ></input>
                ) : (
                  <p>{client.address?.toUpperCase()}</p>
                )}
                <p>TELÉFONO: </p>
                {edit ? (
                  <input
                    type="text"
                    name="phone"
                    onChange={inputHandler}
                    placeholder={client.phone}
                  ></input>
                ) : (
                  <p>{client.phone}</p>
                )}
                <p>EMAIL: </p>
                {edit ? (
                  <input
                    type="email"
                    name="email"
                    onChange={inputHandler}
                    placeholder={client.email?.toUpperCase()}
                  ></input>
                ) : (
                  <p>{client.email?.toUpperCase()}</p>
                )}
                <p>FECHA ALTA: </p>
                <p>{client.createdAt?.substring(0, 10)}</p>
                <p>FECHA ÚLTIMA ACTUALIZACIÓN: </p>
                <p>{client.updatedAt?.substring(0, 10)}</p>
                {msgError}
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
                    <th>MONTO: </th>
                    <th>ENVIO: </th>
                    <th>ESTADO: </th>
                    <th>FECHA ALTA: </th>
                    <th>FECHA ACT.: </th>
                  </tr>
                </thead>
                {client.Orders?.map((order) => {
                  return (
                    <tbody key={order.id} onClick={() => viewOrder(order)}>
                      <tr>
                        <td>{order.id}</td>
                        <td>{order.ammount}€</td>
                        <td>{order.shipping}€</td>
                        <td>{order.status?.toUpperCase()}</td>
                        <td>{order.createdAt?.substring(0, 10)}</td>
                        <td>{order.updatedAt?.substring(0, 10)}</td>
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
                    <th>MENSAJE: </th>
                    <th>ID ADMIN: </th>
                    <th>RESPUESTA: </th>
                    <th>FECHA ALTA: </th>
                    <th>FECHA ACT.: </th>
                  </tr>
                </thead>
                {client.Messages?.map((message) => {
                  return (
                    <tbody
                      className="a"
                      key={message.id}
                      onClick={() => viewMessage(message.id)}
                    >
                      <tr>
                        <td>{message.id}</td>
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
            </div>
          </div>
          <div className="wishlist">
            <div className="wishlistDetails">
              <h3>FAVORITOS</h3>
              <table className="detailTable">
                <thead>
                  <tr>
                    <th>ID: </th>
                    <th>ID PRODUCTO: </th>
                    <th>FECHA ALTA: </th>
                    <th>FECHA ACT.: </th>
                  </tr>
                </thead>
                {client.Wishlists?.map((product) => {
                  return (
                    <tbody
                      className="a"
                      key={product.id}
                      onClick={() => viewProduct(product.productId)}
                    >
                      <tr>
                        <td>{product.id}</td>
                        <td>{product.productId}</td>
                        <td>{product.createdAt?.substring(0, 10)}</td>
                        <td>{product.updatedAt?.substring(0, 10)}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
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
}))(ClientDetails);
