import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";

const Header = (props) => {
  const navigate = useNavigate();

  const [click, setClick] = useState(false);

  const clickHandler = () => setClick(!click);

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
        {click ? (
          <div className="search">
            <i className="fa fa-search" onClick={clickHandler}></i>
            <div className="searchBar">
              <SearchBar></SearchBar>
            </div>
          </div>
        ) : (
          <i className="fa fa-search" onClick={clickHandler}></i>
        )}
      </div>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
}))(Header);
