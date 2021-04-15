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
      const keepWines = state.wines.filter(
        (wine) => wine.id !== parseInt(action.deleteWineId)
      );
      return {
        wines: keepWines,
        error: "",
      };

    case "FILTER_WINE":
      const filteredWine = state.wines.filter(
        (wine) => wine.varietal_id === parseInt(action.varietal)
      );
      console.log(filteredWine);
      return {
        ...state,
        wines: [...state, filteredWine],
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
