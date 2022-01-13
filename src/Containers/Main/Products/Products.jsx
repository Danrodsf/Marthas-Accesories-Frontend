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

  const getProductsByPage = (page) => {
    switch (page) {
      case 1:
        getProducts(0);
        break;
      case 2:
        getProducts(9);
        break;
      case 3:
        getProducts(18);
        break;
      case 4:
        getProducts(27);
        break;
      case 5:
        getProducts(36);
        break;
      case 6:
        getProducts(45);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    navigate("/products/1");
    getProducts();
  }, []);

  useEffect(() => {
    getProductsByPage(location.state);
  }, [location.pathname]);

  const getProducts = async (num) => {
    const body = {
      limit: 9,
      offset: num,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/product/getByNumber`,
        body,
        token
      );
      if (res.data.length === 0) {
        setmsgError(`NO SE HA ENCONTRADO NINGÚN PRODUCTO`);
      } else {
        setProducts(res.data.rows);
        setCount(res.data.count);
      }
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO NINGÚN PRODUCTO");
    }
  };

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
