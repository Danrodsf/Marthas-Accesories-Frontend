import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo-black.png";

const Orders = (props) => {
  const navigate = useNavigate();

  const token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const creds = props.credentials.user;
  const [orders, setOrders] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getByUserId(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
  };

  const viewProduct = (product) => {
    navigate("/product", { state: product });
  };

  const getByUserId = async () => {
    const body = {
      userId: creds.id,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/order/getByUser`,
        body,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`NO SE HA ENCONTRADO NINGÚN PEDIDO`);
      } else {
        setOrders(res.data);
        console.log(res.data);
      }
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO NINGÚN PEDIDO");
    }
  };

  if (props.credentials.token !== "") {
    return (
      <div className="main">
        <div className="orders-container container">
          <div className="orders">
            <h1>PEDIDOS</h1>
            <p>
              AQUÍ PUEDES REVISAR LOS PEDIDOS QUE HAS ENVIADO A UN ADMINISTRADOR
              Y LAS RESPUESTAS RECIBIDAS DE LOS MISMOS.
            </p>
            <div>
              {orders?.map((order) => {
                return (
                  <div key={order.id} className="orders-grid">
                    <p>FECHA DEL PEDIDO:</p>
                    <p>{formatDate(order?.createdAt)}</p>
                    <p>NUMERO DE PEDIDO:</p>
                    <p>{order.id}</p>
                    <p>PRODUCTOS:</p>
                    <div>
                      {order.OrderDetails.map((detail) => {
                        return (
                          <div key={detail.id} className="product-detail">
                            <p onClick={() => viewProduct(detail.Product)}>
                              {detail.Product.name}
                            </p>
                            <p>{detail.Product.price}€</p>
                            <img
                              src={detail.Product.imgUrl}
                              className="img"
                              onClick={() => viewProduct(detail.Product)}
                              alt={detail.Product.name}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <p>TOTAL:</p>
                    <p>{order.ammount}€</p>
                  </div>
                );
              })}
              <div className="error sm">{msgError}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="orders-container container">
          <div className="orders">
            <img className="logo" src={Logo} alt="martha's accesorios" />
            <p>DEBES INICIAR SESION PARA VER TUS PEDIDOS</p>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Orders);
