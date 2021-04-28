const initialState = {
  user: {},
  isLoggedIn: false,
  error: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        user: action.user.user,
        isLoggedIn: true,
        users: action.users,
        error: "",
      };

    case "LOGIN_USER":
      console.log(action.user);
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
