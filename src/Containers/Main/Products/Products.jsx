import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import Card from "../../../Components/Card/Card";

const Product = (props) => {
  const token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const [products, setProducts] = useState();
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getAllProducts(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `https://drs-marthas-accesories.herokuapp.com/product/`,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`NO SE HA ENCONTRADO NINGÚN PRODUCTO`);
      } else {
        setProducts(res.data);
      }
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO NINGÚN PRODUCTO");
    }
  };

  return (
    <div className="main">
      <div className="products-container container">
        <div className="products">
          {products?.map((product) => {
            return (
              <div key={product.id} className="product-card">
                <Card prod={product}></Card>
              </div>
            );
          })}
        </div>
        <div className="error sm">{msgError}</div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Product);
