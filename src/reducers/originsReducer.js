const originsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ORIGINS":
      return [...action.origins];

    case "FIND_ORIGIN":
      return [action.origin];

    default:
      return state;
  }
};

export default originsReducer;
