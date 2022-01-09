import { combineReducers } from "redux";
import credentials from "./credentials-reducer";
import admin from "./admin-reducer";
import cart from "./cart-reducer";

const rootReducer = combineReducers({
  credentials,
  admin,
  cart,
});

export default rootReducer;
