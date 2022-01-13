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
              ¡Hola! Gracias por visitar mi pequeño sitio en la web. Me llamo
              Martha y soy una joven emprendedora, hace unos años aprendí a
              hacer piezas de bisutería gracias a mi madre de quien herede los
              conocimientos necesarios. Comenzó como un hobby para hacerme mis
              propios accesorios y tuve la suerte de que mis amistades se
              enamoraban de mis piezas y así surgieron mis primeros clientes.
            </p>
            <p>
              Aunque mi colección no suele ser muy grande, siempre pongo mi
              mayor esfuerzo para que las prendas sean únicas y especiales, y ya
              que estoy, que reflejen un poco de mi personalidad extrovertida.
              Espero que te gusten mis piezas, y estoy siempre a disposición
              para cualquier duda o incluso para realizar prendas personalizadas
              a tu gusto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
