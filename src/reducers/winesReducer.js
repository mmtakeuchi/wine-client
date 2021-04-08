const wines = {
  wines: [],
};

const winesReducer = (state = wines, action) => {
  switch (action.type) {
    case "GET_WINES":
      console.log(action.wines);
      console.log(state);
      return {
        wines: action.wines,
      };

    case "Add_WINE":
      return {
        wines: [...state.wines, action.wine],
      };

    default:
      return state;
  }
};

export default winesReducer;
