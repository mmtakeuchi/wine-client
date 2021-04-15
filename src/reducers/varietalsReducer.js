const varietalsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_VARIETALS":
      return [...action.varietals];
    case "FIND_VARIETAL":
      return [action.varietal];
    default:
      return state;
  }
};

export default varietalsReducer;
