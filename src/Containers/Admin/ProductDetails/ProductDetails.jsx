import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ProductDetails(props) {
  const location = useLocation();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [product, setProduct] = useState(location.state);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getProductById(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductById = async () => {
    const body = {
      id: location.state,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/product/getById`,
        body,
        token
      );
      setProduct(res.data[0]);
      console.log(res.data[0]);
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO EL PRODUCTO");
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-productDetails-container">
        <div className="admin-productDetails">
          <div className="product">
            <h3>DETALLES DEL PRODUCTO</h3>
            <div className="flex">
              <div>
                <img src={product?.imgUrl} alt={product?.name} />
              </div>
              <div className="grid">
                <p>ID: </p>
                <p>{product?.id}</p>
                <p>NOMBRE: </p>
                <p>{product?.name?.toUpperCase()}</p>
                <p>CATEGORIA: </p>
                <p>{product?.category?.toUpperCase()}</p>
                <p>MATERIAL: </p>
                <p>{product?.material?.toUpperCase()}€</p>
                <p>DESCRIPCIÓN: </p>
                <p>{product?.description?.toUpperCase()}€</p>
                <p>COLOR: </p>
                <p>{product?.color?.toUpperCase()}</p>
                <p>PRECIO: </p>
                <p>{product?.price}</p>
                <p>CANTIDAD: </p>
                <p>{product?.quantity}</p>
              </div>
            </div>
          </div>
        </div>
        {msgError}
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(ProductDetails);
