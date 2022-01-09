import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Clients(props) {
  const navigate = useNavigate();
  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [clients, setClients] = useState([]);
  const [msgError, setmsgError] = useState("");

  useEffect(() => {
    getAllClients();
  }, []);

  const getAllClients = async () => {
    try {
      const res = await axios.get(
        "https://drs-marthas-accesories.herokuapp.com/user/",
        token
      );
      setClients(res.data);
    } catch (error) {
      setmsgError(error.message);
    }
  };

  const removeClient = async (userId) => {
    const body = {
      id: userId,
    };

    try {
      await axios({
        method: "delete",
        url: "https://drs-marthas-accesories.herokuapp.com/user/delete",
        data: body,
        headers: {
          Authorization: `Bearer ${props.admin.token}`,
        },
      });
    } catch (error) {
      setmsgError(
        "NO SE HA PODIDO ELIMINAR EL CLIENTE, SI EL CLIENTE TIENE ALGÚN PEDIDO REALIZADO NO SE PUEDE ELIMINAR"
      );
    }
    const res = await axios.post(
      `https://drs-marthas-accesories.herokuapp.com/user/`,
      token
    );
    setClients(res.data);
  };

  const viewClient = (client) => {
    navigate("/admin/clientDetails", { state: client });
  };

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
  };

  return (
    <div className="admin-main">
      <div className="admin-clients-container">
        <div className="admin-clients">
          <table className="table">
            <thead>
              <tr>
                <th>ID:</th>
                <th>NOMBRE:</th>
                <th>APELLIDO:</th>
                <th>EDAD:</th>
                <th>DIRECCIÓN:</th>
                <th>TELÉFONO:</th>
                <th>EMAIL:</th>
                <th>FECHA ALTA:</th>
                <th>FECHA ACT.:</th>
              </tr>
            </thead>
            {clients.map((client) => {
              return (
                <tbody
                  className="clients-table-data"
                  key={client.id}
                  onClick={() => viewClient(client)}
                >
                  <tr>
                    <td>{client.id}</td>
                    <td>{client.firstName?.toUpperCase()}</td>
                    <td>{client.lastName?.toUpperCase()}</td>
                    <td>{client.age}</td>
                    <td>{client.address?.toUpperCase()}</td>
                    <td>{client.phone}</td>
                    <td>{client.email?.toUpperCase()}</td>
                    <td>{formatDate(client.createdAt)}</td>
                    <td>{formatDate(client.updatedAt)}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div>{msgError}</div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(Clients);
