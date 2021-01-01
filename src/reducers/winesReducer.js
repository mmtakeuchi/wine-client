const wines = {
  wines: [],
};

const winesReducer = (state = wines, action) => {
  switch (action.type) {
    case "GET_WINES":
      console.log(action.wines);
      return {
        ...state,
        wines: action.wines,
      };
    case "Add_WINE":
      return {
        ...state,
        wines: [...state.wines, action.wine],
      };

    default:
      return state;
  }
};

export default winesReducer;
