import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Orders(props) {
  const navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [orders, setOrders] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getAllOrders(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllOrders = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/order/",
        token
      );
      setOrders(res.data);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR OBTENER TODOS LOS CLIENTES");
    }
  };

  const viewOrder = (order) => {
    navigate("/admin/orderDetails", { state: order });
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
                <tbody
                  className="orders-table-data"
                  key={order.id}
                  onClick={() => viewOrder(order)}
                >
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{order.ammount}</td>
                    <td>{order.shipping}</td>
                    <td>{order.status?.toUpperCase()}</td>
                    <td>{order.createdAt?.substring(0, 10)}</td>
                    <td>{order.updatedAt?.substring(0, 10)}</td>
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
}))(Orders);
