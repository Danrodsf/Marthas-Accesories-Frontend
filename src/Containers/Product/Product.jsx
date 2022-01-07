import { connect } from "react-redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ADD } from "../../redux/types";
import axios from "axios";

function Product(props) {
  const location = useLocation();

  const token = {
    headers: {
      Authorization: `Bearer ${props.credentials.token}`,
    },
  };

  const creds = props.credentials.user;
  const product = location.state;
  const [msgError, setMsgError] = useState("");

  const addToCart = () => {
    if (creds.id) {
      // check if item isn't already in Cart.
      for (let item of props.cart) {
        if (product.name === item.name) {
          setMsgError("ESTE PRODUCTO YA SE ENCUENTRA EN LA CESTA DE COMPRA");
          return;
        }
      }
      // if not, we add the item to the cart.
      props.dispatch({ type: ADD, payload: product });
      setMsgError("HAS AÑADIDO ESTE PRODUCTO A TU CESTA DE COMPRA");
    } else {
      setMsgError(
        "DEBES INICIAR SESIÓN PARA AGREGAR UN PRODUCTO A TU CESTA DE COMPRA"
      );
    }
  };

  const addToWishlist = async () => {
    if (creds.id) {
      const body = {
        userId: creds.id,
        productId: product.id,
      };

      try {
        await axios.post(
          "https://drs-marthas-accesories.herokuapp.com/wishlist/create",
          body,
          token
        );
        setMsgError("HAS AÑADIDO ESTE PRODUCTO A TU LISTA DE FAVORITOS");
      } catch (error) {
        setMsgError(error.message);
      }
    } else {
      setMsgError(
        "DEBES INICIAR SESIÓN PARA AGREGAR UN PRODUCTO A TUS FAVORITOS"
      );
    }
  };

  return (
    <div className="main">
      <div className="product-details-container container">
        <div className="product-details">
          <div className="product-details-img">
            <img src={product.imgUrl} alt={product.name} />
            <div className="buttons">
              <i className="fa fa-heart" onClick={addToWishlist}></i>
              <i className="fa fa-shopping-basket" onClick={addToCart}></i>
            </div>
          </div>
          <div className="product-details-info">
            <h3>{product.name.toUpperCase()}</h3>
            <div className="product-details-item">
              <h4>CATEGORIA:</h4>
              <p>{product.category.toUpperCase()}</p>
            </div>
            <div className="product-details-item">
              <h4>MATERIAL: </h4>
              <p>{product.material.toUpperCase()}</p>
            </div>
            <div className="product-details-item">
              <h4>COLOR:</h4>
              <p>{product.color.toUpperCase()}</p>
            </div>
            <div className="product-details-item">
              <h4>PRECIO:</h4>
              <p>{product.price}€</p>
            </div>
            <div className="product-details-item">
              <h4>DESCRIPCIÓN: </h4>
              <p>{product.description.toUpperCase()}</p>
            </div>
          </div>
        </div>
        <div className="error sm">{msgError}</div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  credentials: state.credentials,
  cart: state.cart.cart,
}))(Product);
