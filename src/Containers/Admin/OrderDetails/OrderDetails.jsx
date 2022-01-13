import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../../Components/SearchBar/SearchBar";

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
  const [msgError, setmsgError] = useState("");
  const [orderDetails, setOrderDetails] = useState();

  const clickHandler = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    getOrderById(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (orderDetails) {
      setmsgError(
        `HAS ELEGIDO
        ${orderDetails.Product.name.toUpperCase()}
        COMO PRODUCTO A REEMPLAZAR`
      );
    }
  });

  const getOrderById = async () => {
    const body = {
      id: order.id,
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

  const calcAmmount = () => {
    const total = order.ammount - orderDetails.Product.price;
    const newTotal = total + location.state.price;
    return newTotal;
  };

  const editProduct = async () => {
    const bodyOrderDetail = {
      id: orderDetails.id,
      orderId: orderDetails.orderId,
      productId: location.state.id,
      quantity: 1,
    };

    const bodyOrder = {
      id: order.id,
      ammount: calcAmmount(),
    };
    try {
      await axios.put(
        `https://drs-marthas-accesories.herokuapp.com/orderDetail/update`,
        bodyOrderDetail,
        token
      );
      setEdit(false);
    } catch (error) {
      setmsgError(error.message);
    }
    try {
      await axios.put(
        `https://drs-marthas-accesories.herokuapp.com/order/update`,
        bodyOrder,
        token
      );
    } catch (error) {
      setmsgError(error.message);
    }
    getOrderById();
  };

  const removeProduct = async (orderDetail) => {
    const bodyOrderDetail = {
      id: orderDetail.id,
    };

    const bodyOrder = {
      id: order.id,
      ammount: order.ammount - orderDetail.Product.price,
    };

    try {
      await axios({
        method: "delete",
        url: "https://drs-marthas-accesories.herokuapp.com/orderDetail/delete",
        data: bodyOrderDetail,
        headers: {
          Authorization: `Bearer ${props.admin.token}`,
        },
      });
    } catch (error) {
      setmsgError(error.message);
    }
    try {
      await axios.put(
        `https://drs-marthas-accesories.herokuapp.com/order/update`,
        bodyOrder,
        token
      );
    } catch (error) {
      setmsgError(error.message);
    }
    getOrderById();
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
              <p>{order?.id}</p>
              <p>ID DEL USUARIO: </p>
              <p>{order?.userId}</p>
              <p>NOMBRE DEL USUARIO: </p>
              <p className="link" onClick={() => viewClient(order.User)}>
                {order?.User?.firstName} {order?.User?.lastName}
              </p>
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
            <div className="orderItems-title">
              <h3>PRODUCTOS DEL PEDIDO: </h3>
              <div className="btn" onClick={clickHandler}>
                <i className="fa fa-pencil-square-o"></i>
                <p>EDITAR</p>
              </div>
            </div>
            <table className="detailTable">
              <thead>
                <tr>
                  <th>IMAGEN:</th>
                  <th>ID:</th>
                  <th>NOMBRE:</th>
                  <th>CATEGORIA:</th>
                  <th>€:</th>
                  <th>CANT:</th>
                  {edit ? <th>EDITAR:</th> : null}
                </tr>
              </thead>
              {order?.OrderDetails?.map((product) => {
                return (
                  <tbody key={product?.id}>
                    <tr>
                      <td>
                        <img
                          src={product?.Product?.imgUrl}
                          alt={product?.Product?.name}
                          onClick={() => viewProduct(product.Product.id)}
                        />
                      </td>
                      <td onClick={() => viewProduct(product.Product.id)}>
                        {product?.id}
                      </td>
                      <td onClick={() => viewProduct(product.Product.id)}>
                        {product?.Product?.name?.toUpperCase()}
                      </td>
                      <td>{product?.Product?.category?.toUpperCase()}</td>
                      <td>{product?.Product?.price}€</td>
                      <td>{product?.quantity}</td>
                      {edit ? (
                        <td>
                          <div className="btn">
                            <i
                              className="fa fa-pencil-square-o"
                              onClick={() => setOrderDetails(product)}
                            ></i>
                            <i
                              className="fa fa-minus-square"
                              onClick={() => removeProduct(product)}
                            ></i>
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
          {edit ? (
            <div className="search">
              <div className="info">
                <p>
                  PARA EDITAR LOS PRODUCTOS DE UN PEDIDO, HAZ PRIMERO CLICK EN
                  EL PRODUCTO QUE QUIERAS REEMPLAZAR, Y LUEGO UTILIZA LA BARRA
                  DE BUSQUEDA PARA ENCONTRAR EL PRODUCTO NUEVO, Y HAZ CLICK
                  SOBRE EL, PARA FINALIZAR, HAZ CLICK EN ENVIAR.
                </p>
                <p>{msgError}</p>
              </div>
              <SearchBar></SearchBar>
              <div className="btn" onClick={editProduct}>
                <i className="fa fa-check-square-o"></i>
                <p>ENVIAR</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(OrderDetails);
