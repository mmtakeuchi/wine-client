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

    case "ADD_WINE":
      console.log(action.newWine);
      console.log(state);
      return {
        ...state,
        wines: [...state.wines, action.newWine],
      };

    case "GET_WINE":
      return { ...state, wines: action.wine };

    case "EDIT_WINE":
      console.log(action.updatedWine);
      console.log(...state);
      let otherWines = state.wines.filter(
        (wine) => wine.id !== action.updatedWine.id
      );
      console.log(otherWines);
      return { wines: [...otherWines, action.updatedWine] };

    case "DELETE_WINE":
      console.log(action.deleteWineId);
      console.log(state.wines);
      const filteredWine = state.wines.filter(
        (wine) => wine.id !== parseInt(action.deleteWineId)
      );
      console.log(filteredWine);
      return {
        wines: filteredWine,
      };

    default:
      return state;
  }
};

export default winesReducer;
