const varietalsReducer = (state = { varietals: [] }, action) => {
  switch (action.type) {
    case "GET_VARIETALS":
      console.log({ ...state, varietals: action.varietals });
      return {
        ...state,
        varietals: action.varietals,
      };
    default:
      return state;
  }
};

export default varietalsReducer;
