import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD } from "../../redux/types";
import axios from "axios";

function Card(props) {
  const navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.credentials.token}`,
    },
  };

  const creds = props.credentials.user;
  const product = props.prod;
  const [msgError, setMsgError] = useState("");

  const addToCart = () => {
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
  };

  const addToWishlist = async () => {
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
  };

  const viewProduct = () => {
    navigate("/product", { state: product });
  };

  return (
    <div>
      <div className="card">
        <img
          className="img"
          src={product.imgUrl}
          alt={product.name}
          onClick={viewProduct}
        />
        <div className="card-info">
          <h4 className="title" onClick={viewProduct}>
            {product.name}
          </h4>
          <p className="price">{product.price}€</p>
        </div>
        <div className="buttons">
          <i className="fa fa-heart" onClick={addToWishlist}></i>
          <i className="fa fa-shopping-basket" onClick={addToCart}></i>
        </div>
      </div>
      <div className="error sm">{msgError}</div>
    </div>
  );
}

export default connect((state) => ({
  credentials: state.credentials,
  cart: state.cart.cart,
}))(Card);
