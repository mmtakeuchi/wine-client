const initialState = {
  user: {},
  isLoggedIn: false,
  error: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        error: "",
      };

    case "LOGOUT_USER":
      return {
        user: {},
        isLoggedIn: false,
      };

    case "USER_ERROR":
      return {
        ...state,
        isLoggedIn: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default usersReducer;
