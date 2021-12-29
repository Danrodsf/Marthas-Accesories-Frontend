import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { UPDATE_USER } from "../../redux/types";
import FormInput from "../../Components/FormInput/FormInput";
import Button from '../../Components/Button/Button'
import axios from "axios";

const Profile = (props) => {
  let token = {
    headers: { Authorization: `Bearer ${props.credentials.token}` },
  };

  const [creds, setCreds] = useState(props.credentials.user);
  const [msgError, setmsgError] = useState("");

  const inputHandler = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update();
  };

  useEffect(() => {
    setCreds(props.credentials.user);
  }, [props.credentials]);

  const update = async () => {
    let body = {
      id: creds.id,
      firstName: creds.firstName,
      lastName: creds.lastName,
      age: creds.age,
      address: creds.address,
      phone: creds.phone,
    };

    try {
      let res = await axios.put(
        `https://drs-marthas-accesories.herokuapp.com/user/update`,
        body,
        token
      );
      setmsgError(res.data.message);
      setTimeout(() => {
        props.dispatch({ type: UPDATE_USER, payload: creds });
      }, 1000);
    } catch (error) {
      setmsgError("Hubo un error al intentar actualizar datos");
      console.log(creds)
      return;
    }
  };

  const formatDate = (initialDate) => {
    let splitDate = initialDate.split(/[- : T .]/);
    let arrayDate = [splitDate[2], splitDate[1], splitDate[0]];
    let formattedDate = arrayDate.join("-");
    return formattedDate;
  };

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Nombre",
      value: "",
      errorMessage:
        "Nombre debe de contener solo letras y entre 3 y 20 caracteres",
      label: "Nombre",
      pattern: "^[A-Za-z]{3,20}$",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Apellidos",
      value: "",
      errorMessage:
        "Apellidos debe de contener solo letras y entre 3 y 50 caracteres",
      label: "Apellidos",
      pattern: "^[A-Za-z ]{3,50}$",
      required: true,
    },
    {
      id: 3,
      name: "age",
      type: "number",
      placeholder: "Edad",
      value: 0,
      label: "Edad",
      min: 18,
      max: 99,
      errorMessage: "Edad debe de ser entre 18 y 99 años",
      required: true,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Dirección",
      value: "",
      errorMessage: "Dirección deber contener entre 5 y 50 caracteres",
      label: "Dirección",
      pattern: "^[A-Za-z0-9 .,-]{5,50}$",
      required: true,
    },
    {
      id: 5,
      name: "phone",
      type: "text",
      placeholder: "Teléfono",
      value: "",
      errorMessage: "Teléfono debe de contener 9 dígitos",
      label: "Teléfono",
      pattern: "^[0-9]{9}$",
      required: true,
    },
  ];

  if (props.credentials.token !== "") {
    return (
      <div className="main">
        <div className="profile-container container">
        <div className="profile">
          <h2>Perfil</h2>
          <form className="form" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={creds[input.name]}
                onChange={inputHandler}
              />
            ))}
            <Button></Button>
          </form>
          <div>{msgError}</div>
        </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>No estas logueado</div>
      </div>
    );
  }
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Profile);
