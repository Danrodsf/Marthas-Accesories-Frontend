import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo-black.png";

const Wishlist = (props) => {
  const navigate = useNavigate();

  let token = {
    headers: {
      Authorization: `Bearer ${props.credentials.token}`,
    },
  };

  const creds = props.credentials.user;
  const [wishlist, setWishlist] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getByUserId(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewProduct = (product) => {
    navigate("/product", { state: product });
  };

  const getByUserId = async () => {
    const body = {
      userId: creds.id,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/wishlist/getByUser`,
        body,
        token
      );
      setWishlist(res.data);
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO NINGÚN PRODUCTO");
    }
  };

  const removeFromWishlist = async (itemId) => {
    const body = {
      id: itemId,
      userId: creds.id,
    };

    try {
      await axios({
        method: "delete",
        url: "https://drs-marthas-accesories.herokuapp.com/wishlist/delete",
        data: body,
        headers: {
          Authorization: `Bearer ${props.credentials.token}`,
        },
      });
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/wishlist/getByUser`,
        body,
        token
      );
      setWishlist(res.data);
    } catch (error) {
      setmsgError(error.message);
    }
  };

  if (props.credentials.token !== "") {
    return (
      <div className="main">
        <div className="wishlist-container container">
          <div className="wishlist">
            <h1>FAVORITOS</h1>
            <p>
              AQUÍ PUEDES REVISAR Y MODIFICAR LOS ARTÍCULOS QUE HAS AÑADIDO COMO
              FAVORITOS.
            </p>
          </div>
          <div className="wishlist-items">
            {wishlist.map((product) => {
              return (
                <div key={product.id} className="wishlist-items-detail">
                  <img
                    src={product.Product.imgUrl}
                    alt={product.Product.name}
                    onClick={() => viewProduct(product.Product)}
                  />
                  <p onClick={() => viewProduct(product.Product)}>
                    {product.Product.name}
                  </p>
                  <i
                    className="fa fa-trash"
                    onClick={() => removeFromWishlist(product.id)}
                  ></i>
                </div>
              );
            })}
            {msgError}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="wishlist-container container">
          <div className="wishlist">
            <img className="logo" src={Logo} alt="martha's accesorios" />
            <p>DEBES INICIAR SESIÓN PARA VER TUS PRODUCTOS FAVORITOS</p>
          </div>
        </div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Wishlist);
