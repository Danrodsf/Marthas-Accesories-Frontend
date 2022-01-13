import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [msgError, setmsgError] = useState();
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      searchProducts();
    }, 500);
    return () => clearTimeout(timeOut); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const searchProducts = async () => {
    const body = {
      name: input,
    };
    try {
      const res = await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/product/getByName",
        body,
        token
      );
      setProducts(res.data.rows);
      location.pathname === "/admin/orderDetails"
        ? navigate("/admin/orderDetails")
        : navigate("/searchProducts", { state: res.data.rows });
    } catch (error) {
      setmsgError(error.message);
    }
  };

  return (
    <div className="searchBar">
      <input
        type="search"
        name="name"
        value={input}
        placeholder="Buscar por nombre"
        onChange={inputHandler}
      />
      {location.pathname === "/admin/orderDetails" && input.length > 2 ? (
        <div className="results">
          {products.map((product) => {
            return (
              <div key={product.id} className="result-items">
                <img
                  className="searchImg"
                  src={product.imgUrl}
                  alt={product.name}
                />
                <p
                  onClick={() =>
                    navigate("/admin/orderDetails", { state: product })
                  }
                >
                  {product.name}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
      {msgError}
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(SearchBar);
