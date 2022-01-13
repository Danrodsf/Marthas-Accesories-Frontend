import { ADMIN_LOGIN, ADMIN_LOGOUT, UPDATE_ADMIN } from "../types";

const initialState = {
  token: "",
  admin: {},
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      return action.payload;

    case ADMIN_LOGOUT:
      return initialState;

    case UPDATE_ADMIN:
      return { ...state, admin: action.payload };

    default:
      return state;
  }
};
export default adminReducer;
