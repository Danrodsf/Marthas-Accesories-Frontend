import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import FormInput from "../../../Components/FormInput/FormInput";
import Button from "../../../Components/Button/Button";

function AddProduct(props) {
  let navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [product, setProduct] = useState({
    name: "",
    category: "",
    material: "",
    description: "",
    color: "",
    price: "",
    quantity: "",
    imgUrl: "",
  });

  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    setmsgError("");
    let body = {
      name: product.name,
      category: product.category,
      material: product.material,
      description: product.description,
      color: product.color,
      price: product.price,
      quantity: product.quantity,
      imgUrl: product.imgUrl,
    };

    try {
      await axios.post(
        "https://drs-marthas-accesories.herokuapp.com/product/create",
        body,
        token
      );
      setmsgError("PRODUCTO AÑADIDO");
      setTimeout(() => {
        navigate("/admin/Products");
      }, 2000);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL INTENTAR AÑADIR EL PRODUCTO");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "NOMBRE",
      value: "",
      errorMessage:
        "NOMBRE DEBE DE CONTENER ENTRE 3 Y 100 CARACTERES Y SIN CARACTERES ESPECIALES",
      pattern: "^[A-Za-z0-9 ]{3,100}$",
      required: true,
    },
    {
      id: 2,
      name: "category",
      type: "text",
      placeholder: "CATEGORIA",
      value: "",
      errorMessage:
        "CATEGORIA DEBE DE CONTENER SOLO LETRAS Y ESPACIOS. ENTRE 3 Y 50 CARACTERES",
      pattern: "^[A-Za-z ]{3,50}$",
      required: true,
    },
    {
      id: 3,
      name: "material",
      type: "text",
      placeholder: "MATERIAL",
      value: "",
      errorMessage:
        "MATERIAL DEBE DE CONTENER ENTRE 3 Y 255 CARACTERES Y SIN CARACTERES ESPECIALES",
      pattern: "^[A-Za-z0-9 ]{3,255}$",
      required: true,
    },
    {
      id: 4,
      name: "description",
      type: "text",
      placeholder: "DESCRIPCIÓN",
      value: "",
      errorMessage:
        "DESCRIPCIÓN DEBE DE CONTENER ENTRE 3 Y 255 CARACTERES Y SIN CARACTERES ESPECIALES",
      pattern: "^[A-Za-z0-9 ]{3,255}$",
      required: true,
    },
    {
      id: 5,
      name: "color",
      type: "text",
      placeholder: "COLOR",
      value: "",
      errorMessage:
        "COLOR DEBE DE CONTENER SOLO LETRAS Y ESPACIOS. ENTRE 3 Y 50 CARACTERES",
      pattern: "^[A-Za-z ]{3,50}$",
      required: true,
    },
    {
      id: 6,
      name: "price",
      type: "number",
      placeholder: "PRECIO",
      value: "",
      min: 0,
      max: 999,
      errorMessage: "PRECIO DE DE SER UN NUMERO ENTRE EL 0 Y 999",
      required: true,
    },
    {
      id: 7,
      name: "quantity",
      type: "number",
      placeholder: "CANTIDAD",
      value: "",
      min: 0,
      max: 999,
      errorMessage: "CANTIDAD DE DE SER UN NUMERO ENTRE EL 0 Y 999",
      required: true,
    },
    {
      id: 8,
      name: "imgUrl",
      type: "text",
      placeholder: "URL IMAGEN",
      value: "",
      errorMessage: "DEBE CONTENER UNA DIRECCIÓN HTTP/HTTPS",
      pattern: "^((http|https)://|(HTTP|HTTPS)://)",
      required: true,
    },
  ];

  return (
    <div className="admin-main">
      <div className="admin-addProduct-container container">
        <div className="admin-addProduct">
          <h2>AÑADIR PRODUCTO</h2>
          <form className="form" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={product[input.name]}
                onChange={inputHandler}
              />
            ))}
            <Button text="AÑADIR PRODUCTO"></Button>
            <div className="error sm">{msgError}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(AddProduct);
