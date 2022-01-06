import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { REMOVE, CLEAN } from "../../redux/types";
import Logo from "../../img/logo-black.png";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const token = {
    headers: {
      Authorization: `Bearer ${props.credentials.token}`,
    },
  };

  const creds = props.credentials.user;
  const [cart, setCart] = useState(props.cart.cart);
  const [total, setTotal] = useState(0);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    totalCart(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCart(props.cart.cart);
  }, [props.cart.cart]);

  useEffect(() => {
    totalCart();
  });

  const totalCart = () => {
    let total = 0;
    cart.forEach((element) => {
      total = total + element.price;
    });
    setTotal(total);
  };

  const removeFromCart = (product) => {
    props.dispatch({ type: REMOVE, payload: product });
  };

  const cleanCart = () => {
    props.dispatch({ type: CLEAN, payload: [] });
  };

  const viewProduct = (product) => {
    navigate("/product", { state: product });
  };

  //////////////////////////////////////////////////////////////////////// CREATE ORDER ////////////////////////////////////////////////////////////////////////

  const createOrder = async () => {
    const body = {
      userId: creds.id,
      ammount: total,
      shipping: 0,
    };

    try {
      const res = await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/order/create",
        body,
        token
      );
      createOrderDetail(res.data.data.id);
    } catch (error) {
      setmsgError(error.message);
    }
  };

  const createOrderDetail = (id) => {
    cart.forEach(async (element) => {
      const body = {
        orderId: id,
        productId: element.id,
        quantity: 1,
      };

      try {
        await axios.post(
          "https://drs-marthas-accesories.herokuapp.com/orderDetail/create",
          body,
          token
        );
        setmsgError("Pedido realizado con éxito");

        setTimeout(() => {
          props.dispatch({ type: CLEAN, payload: [] });
          navigate("/orders");
        }, 1000);
      } catch (error) {
        setmsgError(error.message);
      }
    });
  };

  //////////////////////////////////////////////////////////////////////// END CREATE ORDER ////////////////////////////////////////////////////////////////////////

  if (props.credentials.token !== "") {
    return (
      <div className="main">
        <div className="cart-container container">
          <div className="cart">
            <h1>CESTA DE COMPRA</h1>
            <p>
              AQUÍ PUEDES REVISAR Y MODIFICAR LOS ARTÍCULOS QUE HAS AÑADIDO A TU
              CESTA DE COMPRA.
            </p>
            <Button text="Vaciar Cesta" click={cleanCart}></Button>
          </div>
          {cart.length === 0 ? (
            <h3>NO HAY NINGÚN PRODUCTO EN LA CESTA PARA MOSTRAR</h3>
          ) : (
            <div className="cart-items">
              {cart.map((product, index) => {
                return (
                  <div key={product.id} className="cart-items-details">
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      onClick={() => viewProduct(product)}
                    />
                    <p onClick={() => viewProduct(product)}>{product.name}</p>
                    <p>{product.price}€</p>
                    <i
                      className="fa fa-trash"
                      onClick={() => removeFromCart(index)}
                    ></i>
                  </div>
                );
              })}
              <div className="error sm">{msgError}</div>
              <div className="order">
                <h3>Total productos: {total}€</h3>
                <Button
                  text="Realizar Pedido"
                  className="buy"
                  click={createOrder}
                ></Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="cart-container container">
          <div className="cart">
            <img className="logo" src={Logo} alt="martha's accesorios" />
            <p>DEBES INICIAR SESIÓN PARA VER TU CESTA DE COMPRA</p>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  cart: state.cart,
}))(Cart);
