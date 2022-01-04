import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Product(props) {
  const location = useLocation();
  const [product, setProduct] = useState(location.state);
  console.log(product);

  const addToCart = () => {};

  const addToWishlist = () => {};

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
              <p>Categoria: </p>
              <p>{product.category}</p>
            </div>
            <div className="product-details-item">
              <p>Material: </p>
              <p>{product.material}</p>
            </div>
            <div className="product-details-item">
              <p>Color:</p>
              <p>{product.color}</p>
            </div>
            <div className="product-details-item">
              <p>Precio:</p>
              <p>{product.price}€</p>
            </div>
            <div className="product-details-item">
              <p>Descripción: </p>
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
