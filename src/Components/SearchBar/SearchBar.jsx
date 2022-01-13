import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const navigate = useNavigate();

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
    return () => clearTimeout(timeOut);
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
      navigate("searchProducts", { state: res.data.rows });
    } catch (error) {
      setmsgError(error.message);
    }
  };

  return (
    <div>
      <input
        type="search"
        name="name"
        value={input}
        placeholder="Buscar por nombre"
        onChange={inputHandler}
      />
      {msgError}
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(SearchBar);
