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
        cart: [
          ...state.cart.slice(0, action.payload),
          ...state.cart.slice(action.payload + 1),
        ],
      };

    case EDIT:
      let newCart = state.cart.map((product) => {
        if (product.name === action.payload.name) {
          //if exists
          product.inCart = action.payload.newQuantity; // edit
        }

        return product;
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
