import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="nav-container container">
        <i className="fa fa-home" onClick={() => navigate("/")}></i>
        {props.credentials.user.id ? (
          <i className="fa fa-user" onClick={() => navigate("/userHub")}></i>
        ) : (
          <i className="fa fa-user" onClick={() => navigate("/signIn")}></i>
        )}
        <i
          className="fa fa-shopping-basket"
          onClick={() => navigate("/cart")}
        ></i>
        <i className="fa fa-heart-o" onClick={() => navigate("/wishlist")}></i>
        <i className="fa fa-undo" onClick={() => navigate(-1)}></i>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Header);
