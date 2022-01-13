import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetails(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const token = {
    headers: {
      Authorization: `Bearer ${props.admin.token}`,
    },
  };

  const [product, setProduct] = useState(location.state);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState();
  const [msgError, setmsgError] = useState("");

  const clickHandler = () => {
    setEdit(!edit);
  };

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getProductById(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductById = async () => {
    const body = {
      id: location.state,
    };

    try {
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/product/getById`,
        body,
        token
      );
      setProduct(res.data[0]);
    } catch (error) {
      setmsgError("NO SE HA ENCONTRADO EL PRODUCTO");
    }
  };

  const editProduct = async () => {
    const body = {
      id: product.id,
      name: input.name,
      category: input.category,
      material: input.material,
      description: input.description,
      color: input.color,
      price: input.price,
      quantity: input.quantity,
      imgUrl: input.imgUrl,
    };
    try {
      await axios.put(
        `https://drs-marthas-accesories.herokuapp.com/product/update`,
        body,
        token
      );
      const res = await axios.post(
        `https://drs-marthas-accesories.herokuapp.com/product/getById`,
        body,
        token
      );
      setProduct(res.data[0]);
      setEdit(false);
    } catch (error) {
      setmsgError("HUBO UN ERROR AL EDITAR EL PRODUCTO");
    }
  };

  const removeProduct = async () => {
    const body = {
      id: product.id,
    };
    try {
      await axios({
        method: "delete",
        url: "https://drs-marthas-accesories.herokuapp.com/product/delete",
        data: body,
        headers: {
          Authorization: `Bearer ${props.admin.token}`,
        },
      });
      navigate("/admin/Products");
    } catch (error) {
      setmsgError(error.message);
    }
  };

  return (
    <div className="admin-main">
      <div className="admin-productDetails-container">
        <div className="admin-productDetails">
          <div className="product">
            <div className="productDetails">
              <div className="productDetails-title">
                <h3>DATOS DEL PRODUCTO: </h3>
                <div className="btn" onClick={removeProduct}>
                  <i className="fa fa-minus-square"></i>
                  <p>ELIMINAR</p>
                </div>
                <div className="btn" onClick={clickHandler}>
                  <i className="fa fa-pencil-square-o"></i>
                  <p>EDITAR</p>
                </div>
                {edit ? (
                  <div className="btn" onClick={editProduct}>
                    <i className="fa fa-check-square-o"></i>
                    <p>ENVIAR</p>
                  </div>
                ) : null}
              </div>
              <div className="flex">
                <div className="img">
                  <img src={product?.imgUrl} alt={product?.name} />
                </div>
                <div className="grid">
                  <p>ID DEL PRODUCTO: </p>
                  <p>{product.id}</p>
                  <p>NOMBRE: </p>
                  {edit ? (
                    <input
                      className="input"
                      type="text"
                      name="name"
                      onChange={inputHandler}
                      placeholder={product.name?.toUpperCase()}
                    ></input>
                  ) : (
                    <p>{product.name?.toUpperCase()}</p>
                  )}
                  <p>CATEGORIA: </p>
                  {edit ? (
                    <input
                      className="input"
                      type="text"
                      name="category"
                      onChange={inputHandler}
                      placeholder={product.category?.toUpperCase()}
                    ></input>
                  ) : (
                    <p>{product.category?.toUpperCase()}</p>
                  )}
                  <p>MATERIAL: </p>
                  {edit ? (
                    <input
                      className="input"
                      type="text"
                      name="material"
                      onChange={inputHandler}
                      placeholder={product.material?.toUpperCase()}
                    ></input>
                  ) : (
                    <p>{product.material?.toUpperCase()}</p>
                  )}
                  <p>DESCRIPCIÓN: </p>
                  {edit ? (
                    <input
                      className="input"
                      type="text"
                      name="description"
                      onChange={inputHandler}
                      placeholder={product.description?.toUpperCase()}
                    ></input>
                  ) : (
                    <p>{product.description?.toUpperCase()}</p>
                  )}
                  <p>COLOR: </p>
                  {edit ? (
                    <input
                      className="input"
                      type="text"
                      name="color"
                      onChange={inputHandler}
                      placeholder={product.color?.toUpperCase()}
                    ></input>
                  ) : (
                    <p>{product.color?.toUpperCase()}</p>
                  )}
                  <p>PRECIO: </p>
                  {edit ? (
                    <input
                      className="input"
                      type="number"
                      name="price"
                      onChange={inputHandler}
                      placeholder={product.price}
                    ></input>
                  ) : (
                    <p>{product.price}</p>
                  )}
                  <p>CANTIDAD: </p>
                  {edit ? (
                    <input
                      className="input"
                      type="number"
                      name="quantity"
                      onChange={inputHandler}
                      placeholder={product.quantity}
                    ></input>
                  ) : (
                    <p>{product.quantity}</p>
                  )}
                  <p>URL IMAGEN: </p>
                  {edit ? (
                    <input
                      className="input"
                      type="number"
                      name="imgUrl"
                      onChange={inputHandler}
                      placeholder={product.imgUrl}
                    ></input>
                  ) : (
                    <p>{product.imgUrl}</p>
                  )}
                  <p>FECHA ALTA: </p>
                  <p>{product.createdAt?.substring(0, 10)}</p>
                  <p>FECHA ÚLTIMA ACTUALIZACIÓN: </p>
                  <p>{product.updatedAt?.substring(0, 10)}</p>
                  {msgError}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(ProductDetails);
