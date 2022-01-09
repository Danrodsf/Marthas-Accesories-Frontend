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
        "https://drs-marthas-accesories.herokuapp.com/product/",
        token
      );
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR OBTENER TODOS LOS CLIENTES");
    }
  };

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
  };

  return (
    <div className="admin-main">
      <div className="admin-products-container">
        <div className="admin-products">
          <table className="table">
            <thead>
              <tr>
                <th>ID:</th>
                <th>NOMBRE:</th>
                <th>CATEGORIA:</th>
                <th>MATERIAL:</th>
                <th>DESCRIPCIÓN:</th>
                <th>COLOR:</th>
                <th>€:</th>
                <th>CANT.:</th>
                <th>FECHA ALTA:</th>
                <th>FECHA ACT:</th>
              </tr>
            </thead>
            {products.map((product) => {
              return (
                <tbody className="products-table-data" key={product.id}>
                  <tr>
                    <td>{product.id}</td>
                    <td>{product.name?.toUpperCase()}</td>
                    <td>{product.category?.toUpperCase()}</td>
                    <td>{product.material?.toUpperCase()}</td>
                    <td>{product.description?.toUpperCase()}</td>
                    <td>{product.color}</td>
                    <td>{product.price}€</td>
                    <td>{product.quantity}</td>
                    <td>{formatDate(product.createdAt)}</td>
                    <td>{formatDate(product.updatedAt)}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(Products);
