import Logo from "../../img/logo-black.png";
import Hero from "../../img/hero.jpg";
import Girl from "../../img/bg-girl.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    navigate("/product", { state: product });
  };

  return (
    <div className="main">
      <div className="home-container">
        <img className="logo" src={Logo} alt="martha's accesorios" />
        <img className="hero" src={Hero} alt="hero" />
        <div className="top-10">
          <h3>UN POCO DE NOSOTROS</h3>
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
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloribus aliquid quidem ipsa saepe, culpa asperiores laborum
              temporibus, repellat omnis minima ipsam. Provident, doloribus
              adipisci corrupti dicta esse numquam quisquam iusto natus impedit,
              voluptas, eos quaerat quos sint? Expedita, ab culpa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
