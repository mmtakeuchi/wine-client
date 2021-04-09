const origins = {
  origins: [],
};

const originsReducer = (state = origins, action) => {
  switch (action.type) {
    case "GET_ORIGINS":
      return {
        ...state,
        origins: action.origins,
      };

    case "FIND_ORIGIN":
      return {
        ...state,
        origins: action.origin,
      };

    default:
      return state;
  }
};

export default originsReducer;
