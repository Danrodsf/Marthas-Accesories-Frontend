import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Products(props) {
  const navigate = useNavigate();
  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [products, setProducts] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getAllProducts(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/product/",
        token
      );
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR OBTENER TODOS LOS CLIENTES");
    }
  };

  const viewProduct = (product) => {
    navigate("/admin/productDetails", { state: product });
  };

  return (
    <div className="admin-main">
      <div className="admin-products-container">
        <div className="admin-products">
          <table className="table">
            <thead>
              <tr>
                <th>IMAGEN:</th>
                <th>ID:</th>
                <th>NOMBRE:</th>
                <th>CATEGORIA:</th>
                <th>MATERIAL:</th>
                <th>COLOR:</th>
                <th>€:</th>
                <th>CANT.:</th>
                <th>FECHA ALTA:</th>
                <th>FECHA ACT:</th>
              </tr>
            </thead>
            {products.map((product) => {
              return (
                <tbody key={product.id} onClick={() => viewProduct(product.id)}>
                  <tr>
                    <td>
                      <img src={product.imgUrl} alt={product.name} />
                    </td>
                    <td>{product.id}</td>
                    <td>{product.name?.toUpperCase()}</td>
                    <td>{product.category?.toUpperCase()}</td>
                    <td>{product.material?.toUpperCase()}</td>
                    <td>{product.color}</td>
                    <td>{product.price}€</td>
                    <td>{product.quantity}</td>
                    <td>{product.createdAt?.substring(0, 10)}</td>
                    <td>{product.updatedAt?.substring(0, 10)}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          {msgError}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(Products);
