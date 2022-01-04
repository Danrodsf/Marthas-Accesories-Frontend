import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

const Wishlist = (props) => {
  const token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const creds = props.credentials.user;
  const [wishlist, setWishlist] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getByUserId(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      if (res.data.length === 0) {
        setmsgError(`NO SE HA ENCONTRADO NINGÚN MENSAJE`);
      } else {
        setWishlist(res.data);
        console.log(res.data);
      }
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO NINGÚN MENSAJE");
    }
  };

  if (props.credentials.token !== "") {
    return (
      <div className="main">
        <div className="wishlist-container container">
          <div className="wishlist">
            <h1>Favoritos</h1>
            <p>
              AQUÍ PUEDES REVISAR Y MODIFICAR LOS ARTÍCULOS QUE HAS AÑADIDO COMO
              FAVORITOS.
            </p>
          </div>
          <div className="wishlist-items">
            {wishlist.map((product) => {
              return (
                <div key={product.id} className="wishlist-items2">
                  <img
                    src={product.Product.imgUrl}
                    alt={product.Product.name}
                  />
                  <p>{product.Product.name}</p>
                  <i class="fa fa-trash" aria-hidden="true"></i>
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
        {/* <div className="wishlist-container container">
          <div className="wishlist">
            <img className="logo" src={Logo} alt="martha's accesorios" />
            <p>DEBES INICIAR SESION PARA VER TUS MENSAJES</p>
          </div>
        </div> */}
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Wishlist);
