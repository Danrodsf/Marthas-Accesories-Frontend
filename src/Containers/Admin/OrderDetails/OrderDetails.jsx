import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderDetails(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [order, setOrder] = useState(location.state);
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
    getOrderById();
  }, []);

  const getOrderById = async () => {
    const body = {
      id: location.state.id,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/order/getById`,
        body,
        token
      );
      setOrder(res.data[0]);
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO EL USUARIO");
    }
  };

  const viewClient = (client) => {
    navigate("/admin/clientDetails", { state: client });
  };

  const viewProduct = (product) => {
    navigate("/admin/productDetails", { state: product });
  };

  return (
    <div className="admin-main">
      <div className="admin-orderDetails-container">
        <div className="admin-orderDetails">
          <div className="order">
            <h3>DETALLES DEL PEDIDO</h3>
            <div className="grid">
              <p>ID DEL PEDIDO: </p>
              <p>{order.id}</p>
              <p>ID DEL USUARIO: </p>
              <p>{order.userId}</p>
              <p>NOMBRE DEL USUARIO: </p>
              <a className="link" onClick={() => viewClient(order.User)}>
                {order?.User?.firstName} {order?.User?.lastName}
              </a>
              <p>DIRECCIÓN: </p>
              <p>{order?.User?.address}</p>
              <p>TOTAL: </p>
              <p>{order?.ammount}€</p>
              <p>ENVÍO: </p>
              <p>{order?.shipping}€</p>
              <p>PRODUCTOS: </p>
              <p>{order?.OrderDetails?.length}</p>
              <p>FECHA DEL PEDIDO: </p>
              <p>{order?.createdAt?.substring(0, 10)}</p>
            </div>
          </div>
          <div className="orderItems">
            <h3>PRODUCTOS DEL PEDIDO</h3>
            <table className="detailTable">
              <thead>
                <tr>
                  <th>IMAGEN:</th>
                  <th>ID:</th>
                  <th>NOMBRE:</th>
                  <th>CATEGORIA:</th>
                  <th>€:</th>
                  <th>CANT:</th>
                </tr>
              </thead>
              {order?.OrderDetails?.map((product) => {
                return (
                  <tbody
                    key={product?.id}
                    onClick={() => viewProduct(product.Product.id)}
                  >
                    <tr>
                      <td>
                        <img
                          src={product?.Product?.imgUrl}
                          alt={product?.Product?.name}
                        />
                      </td>
                      <td>{product?.id}</td>
                      <td>{product?.Product?.name?.toUpperCase()}</td>
                      <td>{product?.Product?.category?.toUpperCase()}</td>
                      <td>{product?.Product?.price}€</td>
                      <td>{product?.quantity}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(OrderDetails);
