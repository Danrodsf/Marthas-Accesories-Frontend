import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(props.prod);

  const addToCart = () => {};

  const addToWishlist = () => {};

  const viewProduct = () => {
    navigate("/product", { state: product });
  };

  return (
    <div className="card">
      <img className="img" src={product.imgUrl} alt="" />
      <h4 className="title">{product.name}</h4>
      <p className="price">{product.price}€</p>
      <div className="buttons">
        <i className="fa fa-heart" onClick={addToWishlist}></i>
        <i className="fa fa-shopping-basket" onClick={addToCart}></i>
        <i className="fa fa-search" onClick={viewProduct}></i>
      </div>
    </div>
  );
}

export default connect((state) => ({
  credentials: state.credentials,
}))(Card);
