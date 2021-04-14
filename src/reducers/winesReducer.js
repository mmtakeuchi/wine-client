const wines = {
  wines: [],
  error: "",
};

const winesReducer = (state = wines, action) => {
  switch (action.type) {
    case "GET_WINES":
      console.log(action.wines);
      console.log(state);
      return {
        ...state,
        wines: action.wines,
        error: "",
      };

    case "ADD_WINE":
      console.log(action.newWine);
      console.log(state);
      return {
        ...state,
        wines: [...state.wines, action.newWine],
        error: "",
      };

    case "GET_WINE":
      console.log(action.wine);
      return { ...state, wines: action.wine };

    case "EDIT_WINE":
      console.log(action.updatedWine);
      console.log(state);
      return {
        ...state,
        wines: [...state.wines, action.updatedWine],
        error: "",
      };

    case "DELETE_WINE":
      console.log(action.deleteWineId);
      console.log(state.wines);
      const filteredWine = state.wines.filter(
        (wine) => wine.id !== parseInt(action.deleteWineId)
      );
      console.log(filteredWine);
      return {
        wines: filteredWine,
        error: "",
      };

    case "WINE_ERROR":
      console.log(action.error);
      return {
        ...state,
        wines: [],
        error: action.error,
      };

    default:
      return state;
  }
};

export default winesReducer;
