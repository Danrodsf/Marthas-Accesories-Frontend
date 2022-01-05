import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Card(props) {
  const navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.credentials.token}`,
    },
  };

  const creds = props.credentials.user;
  const [product, setProduct] = useState(props.prod);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = () => {};

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
    </div>
  );
}

export default connect((state) => ({
  credentials: state.credentials,
}))(Card);
