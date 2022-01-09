import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Main(props) {
  const navigate = useNavigate();
  const [creds, setCreds] = useState();

  useEffect(() => {
    if (!props.admin.admin.firstName) {
      navigate("/admin");
    }
  }, []);

  return (
    <div className="admin-main">
      <div className="admin-main-container">
        <div className="admin-main">
          Esto es el contenido asda sdasd asd asd
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  admin: state.admin,
}))(Main);
