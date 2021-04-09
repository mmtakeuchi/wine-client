const varietalsReducer = (state = { varietals: [] }, action) => {
  switch (action.type) {
    case "GET_VARIETALS":
      return {
        ...state,
        varietals: action.varietals,
      };
    case "FIND_VARIETAL":
      return {
        ...state,
        varietals: action.varietal,
      };
    default:
      return state;
  }
};

export default varietalsReducer;
