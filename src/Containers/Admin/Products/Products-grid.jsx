import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

function Products(props) {
  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [products, setProducts] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://mrthacc-backup.herokuapp.com/product/",
        token
      );
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR OBTENER TODOS LOS CLIENTES");
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-products-container container">
        <div className="admin-products">
          <div className="grid">
            <p>ID:</p>
            <p>NOMBRE:</p>
            <p>CATEGORIA:</p>
            <p>MATERIAL:</p>
            <p>DESCRIPCIÓN:</p>
            <p>COLOR:</p>
            <p>PRECIO:</p>
            <p>CANTIDAD:</p>
            <p>FECHA ALTA:</p>
            <p>ÚLTIMA ACTUALIZACIÓN:</p>
            <p>EDITAR:</p>
            <p>ELIMINAR:</p>
            {products.map((product) => {
              return (
                <div className="grid-data" key={product.id}>
                  <p>{product.id}</p>
                  <p>{product.name?.toUpperCase()}</p>
                  <p>{product.category?.toUpperCase()}</p>
                  <p>{product.material?.toUpperCase()}</p>
                  <p>{product.description?.toUpperCase()}</p>
                  <p>{product.color}</p>
                  <p>{product.price}</p>
                  <p>{product.quantity}</p>
                  <p>{product.createdAt}</p>
                  <p>{product.updatedAt}</p>
                  <i className="fa fa-pencil"></i>
                  <i className="fa fa-trash"></i>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(Products);
