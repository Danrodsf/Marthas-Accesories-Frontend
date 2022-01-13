import { ADDSEARCH, RESETSEARCH } from "../types";

const initialState = {
  products: {},
};

const searchBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDSEARCH:
      return action.payload;

    case RESETSEARCH:
      return initialState;

    default:
      return state;
  }
};
export default searchBarReducer;
