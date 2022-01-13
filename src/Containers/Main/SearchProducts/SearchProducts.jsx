import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../../Components/Card/Card";

const Products = (props) => {
  const location = useLocation();
  const [products, setProducts] = useState();
  const [msgError, setmsgError] = useState("");

  const token = {
    headers: {
      Authorization: `Bearer ${props.credentials.token}`,
    },
  };

  useEffect(() => {
    setProducts(location.state); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <div className="main">
      <div className="products-container container">
        <div className="products">
          {products?.map((product) => {
            return (
              <div key={product?.id} className="product-card">
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
}))(Products);
