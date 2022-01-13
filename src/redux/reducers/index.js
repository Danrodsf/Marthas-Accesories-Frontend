import { combineReducers } from "redux";
import credentials from "./credentials-reducer";
import admin from "./admin-reducer";
import cart from "./cart-reducer";
import searchBar from "./searchBar-reducer";

const rootReducer = combineReducers({
  credentials,
  admin,
  cart,
  searchBar,
});

export default rootReducer;
