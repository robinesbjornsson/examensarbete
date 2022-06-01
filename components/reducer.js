export const initialState = {
  restaurants: null,
  total: null,
  isOpen: false,
};

export const actionType = {
  SET_RESTAURANTS: "SET_RESTAURANTS",
  SET_TOTAL: "SET_TOTAL",
  SET_OPEN: "SET_OPEN",
};

const reducer = (state, action) => {
  console.log(action);

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
