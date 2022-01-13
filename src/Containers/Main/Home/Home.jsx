import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getRandom();
  }, []);

  const getRandom = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/product/random"
      );
      setProducts(res.data);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL TRAER PRODUCTOS");
    }
  };

  const viewProduct = (product) => {
    navigate(`/productDetail/${product.name.split(" ").join("_")}`, {
      state: product,
    });
  };

  return (
    <div className="main">
      <div className="home-container">
        <div className="hero" alt="hero">
          <div className="cta">
            <p>PRECIOSOS ACCESORIOS PARA TU DÍA A DÍA</p>
            <p>PERFECTOS PARA COMPLEMENTAR CUALQUIER OUTFIT</p>
            <Button
              text="VER COLECCIÓN"
              click={() => navigate("/products/1")}
            ></Button>
          </div>
        </div>
        <div className="top-10">
          <h1>UN POCO DE NOSOTROS</h1>
          <div className="random">
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <img
                    className="img-small"
                    src={product.imgUrl}
                    alt={product.name}
                    onClick={() => viewProduct(product)}
                  />
                </div>
              );
            })}
          </div>
          <div className="error">{msgError}</div>
          <Button
            text="VER COLECCIÓN"
            click={() => navigate("/products/1")}
          ></Button>
        </div>
        <div className="bg">
          <div className="about">
            <div>
              <h1>CONÓCENOS</h1>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloribus aliquid quidem ipsa saepe, culpa asperiores laborum
              temporibus, repellat omnis minima ipsam. Provident, doloribus
              adipisci corrupti dicta esse numquam quisquam iusto natus impedit,
              voluptas, eos quaerat quos sint? Expedita, ab culpa. Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Doloribus aliquid
              quidem ipsa saepe, culpa asperiores laborum temporibus, repellat
              omnis minima ipsam. Provident, doloribus adipisci corrupti dicta
              esse numquam quisquam iusto natus impedit, voluptas, eos quaerat
              quos sint? Expedita, ab culpa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
