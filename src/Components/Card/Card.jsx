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
        setMsgError("Este producto ya se encuentra en la cesta de compra");
        return;
      }
    }
    // if not, we add the item to the cart.
    props.dispatch({ type: ADD, payload: product });
    setMsgError("Has añadido este producto a tu cesta de compra");
  };

  const addToWishlist = async () => {
    const body = {
      userId: creds.id,
      productId: product.id,
    };

    try {
      const res = await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/wishlist/create",
        body,
        token
      );
    } catch (error) {
      console.log(error);
    }
  };

  const viewProduct = () => {
    navigate("/product", { state: product });
  };

  return (
    <div className="card">
      <img className="img" src={product.imgUrl} alt="" />
      <div className="card-info">
        <h4 className="title">{product.name}</h4>
        <p className="price">{product.price}€</p>
      </div>
      <div className="buttons">
        <i className="fa fa-heart" onClick={addToWishlist}></i>
        <i className="fa fa-shopping-basket" onClick={addToCart}></i>
        <i className="fa fa-search" onClick={viewProduct}></i>
      </div>
      <div>{msgError}</div>
    </div>
  );
}

export default connect((state) => ({
  credentials: state.credentials,
  cart: state.cart.cart,
}))(Card);
