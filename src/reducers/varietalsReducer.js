const varietalsReducer = (state = { varietals: [] }, action) => {
  switch (action.type) {
    case "GET_VARIETALS":
      return {
        ...state,
        varietals: action.varietals,
      };
    default:
      return state;
  }
};

export default varietalsReducer;
