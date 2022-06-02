export const initialState = {
  cart: {
    products: [],
    quantity: 0,
    total: 0,
  },
  restaurants: null,
  total: null,
  isOpen: false,
  
};

export const actionType = {
  SET_CART: "SET_CART",
  SET_RESTAURANTS: "SET_RESTAURANTS",
  SET_TOTAL: "SET_TOTAL",
  SET_OPEN: "SET_OPEN",
  SET_QUANTITY: "SET_QUANTITY",
};

const reducer = (state, action) => {

console.log(action)
  switch (action.type) {
    case actionType.SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
      };

    case actionType.SET_TOTAL:
      return {
        ...state,
        total: action.total,
      };

      case actionType.SET_QUANTITY:
      return {
        ...state,
        quantity: action.quantity,
      };

      case actionType.SET_CART:
        return {
          ...state,
          cart: action.cart,
        };
      case actionType.SET_OPEN:
        return {
          ...state,
          open: action.isOpen,
        };

    default:
      return state;
  }
};

export default reducer;
