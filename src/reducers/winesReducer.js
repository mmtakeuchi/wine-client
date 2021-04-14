const wines = {
  wines: [],
  error: "",
};

const winesReducer = (state = wines, action) => {
  switch (action.type) {
    case "GET_WINES":
      return {
        ...state,
        wines: action.wines,
        error: "",
      };

    case "ADD_WINE":
      return {
        ...state,
        wines: [...state.wines, action.newWine],
        error: "",
      };

    case "GET_WINE":
      return { ...state, wines: action.wine };

    case "EDIT_WINE":
      return {
        ...state,
        wines: [...state.wines, action.updatedWine],
        error: "",
      };

    case "DELETE_WINE":
      const filteredWine = state.wines.filter(
        (wine) => wine.id !== parseInt(action.deleteWineId)
      );

      return {
        wines: filteredWine,
        error: "",
      };

    case "WINE_ERROR":
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
