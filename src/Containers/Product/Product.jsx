import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Product(props) {
  const location = useLocation();

  const token = {
    headers: {
      Authorization: `Bearer ${props.credentials.token}`,
    },
  };

  const creds = props.credentials.user;
  const [product, setProduct] = useState(location.state);
  console.log(product);

  const addToCart = () => {};

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
    } catch (error) {
      console.log(error);
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
            <h3>{product.name}</h3>
            <div className="product-details-item">
              <h4>Categoria:</h4>
              <p>{product.category}</p>
            </div>
            <div className="product-details-item">
              <h4>Material: </h4>
              <p>{product.material}</p>
            </div>
            <div className="product-details-item">
              <h4>Color:</h4>
              <p>{product.color}</p>
            </div>
            <div className="product-details-item">
              <h4>Precio:</h4>
              <p>{product.price}€</p>
            </div>
            <div className="product-details-item">
              <h4>Descripción: </h4>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  credentials: state.credentials,
}))(Product);
