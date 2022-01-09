import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

function Orders(props) {
  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [orders, setOrders] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/order/",
        token
      );
      setOrders(res.data);
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
      <div className="admin-orders-container">
        <div className="admin-orders">
          <table className="table">
            <thead>
              <tr>
                <th>ID:</th>
                <th>ID USUARIO:</th>
                <th>CANTIDAD:</th>
                <th>ENVIO:</th>
                <th>ESTADO:</th>
                <th>FECHA ALTA:</th>
                <th>FECHA ACT.:</th>
              </tr>
            </thead>
            {orders.map((order) => {
              return (
                <tbody className="orders-table-data" key={order.id}>
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{order.ammount}</td>
                    <td>{order.shipping}</td>
                    <td>{order.status?.toUpperCase()}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>{formatDate(order.updatedAt)}</td>
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
}))(Orders);
