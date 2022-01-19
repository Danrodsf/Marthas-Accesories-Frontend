import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";

function OrderConfirm() {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="orderConfirm-container container">
        <div className="orderConfirm">
          <h2>GRACIAS POR TU COMPRA!</h2>
          <h2> TU PEDIDO HA SIDO REALIZADO CON ÉXITO.</h2>
          <p>
            TE CONTACTAREMOS LO ANTES POSIBLE PARA PROCEDER CON EL PAGO Y ENVÍO
            DE LOS PRODUCTOS...
          </p>
          <div className="buttons">
            <Button
              text="SEGUIR COMPRANDO"
              click={() => navigate("/products/1")}
            ></Button>
            <Button
              text="IR A TUS PEDIDOS"
              click={() => navigate("/orders")}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirm;
