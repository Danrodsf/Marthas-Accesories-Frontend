import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  return (
    <div className="nav">
      <div className="nav-container container ">
        <Link to="/">
          <i className="fa fa-home"></i>
        </Link>
        <Link to="/">
          <i className="fa fa-search"></i>
        </Link>
        {props.credentials.user.id ? (
          <Link to="/userHub">
            <i className="fa fa-user"></i>
          </Link>
        ) : (
          <Link to="/signIn">
            <i className="fa fa-user"></i>
          </Link>
        )}
        <Link to="/cart">
          <i className="fa fa-shopping-basket"></i>
        </Link>
        <Link to="/wishlist">
          <i className="fa fa-heart-o"></i>
        </Link>
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Header);
