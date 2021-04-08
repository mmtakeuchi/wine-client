const wines = {
  wines: [],
};

const winesReducer = (state = wines, action) => {
  switch (action.type) {
    case "GET_WINES":
      console.log(action.wines);
      console.log(state);
      return {
        ...state,
        wines: action.wines,
      };

    case "Add_WINE":
      console.log(action.newWine);
      console.log(state);
      return {
        ...state,
        wines: [...state.wines, action.newWine],
      };

    default:
      return state;
  }
};

export default winesReducer;
