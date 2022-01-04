import { ADD, REMOVE, CLEAN, EDIT, TOTAL_CART } from "../types";

const initialState = {
  cart: [],
  totalCart: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,

        cart: [...state.cart, action.payload],
      };

    case REMOVE:
      return {
        ...state,
        cart: action.payload,
      };

    case EDIT:
      let newCart = state.cart.map((_x) => {
        if (_x.name === action.payload.nombre) {
          //if exists
          _x.inCart = action.payload.nuevaCantidad; // edit
        }

        return _x;
      });

      return {
        ...state,
        cart: newCart,
      };

    case CLEAN:
      return {
        ...state,
        cart: action.payload,
      };

    case TOTAL_CART:
      return {
        ...state,
        totalCart: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
