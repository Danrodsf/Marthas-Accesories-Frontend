import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../../Components/Card/Card";
import Pagination from "../../../Components/Pagination/Pagination";

const Products = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState();
  const [msgError, setmsgError] = useState("");
  const [count, setCount] = useState(0);
  const limit = 9;

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
        <div className="paging">
          <Pagination count={count} limit={limit} path="/products"></Pagination>
        </div>
        <div className="products">
          {products?.map((product) => {
            return (
              <div key={product?.id} className="product-card">
                <Card prod={product}></Card>
              </div>
            );
          })}
        </div>
        <Pagination count={count} limit={limit} path="/products"></Pagination>
        <div className="error sm">{msgError}</div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Products);
