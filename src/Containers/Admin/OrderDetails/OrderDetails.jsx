import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function OrderDetails(props) {
  const location = useLocation();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [order, setOrder] = useState(location.state);
  const [msgError, setmsgError] = useState("");

  // useEffect(() => {
  //   getUserById();
  // }, []);

  const getUserById = async () => {
    const body = {
      id: order.id,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/order/getById`,
        body,
        token
      );
      setOrder(res.data);
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO EL USUARIO");
    }
  };

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
  };

  return <div></div>;
}

export default connect((state) => ({
  admin: state.admin,
}))(OrderDetails);
