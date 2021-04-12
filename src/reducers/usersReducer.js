const initialState = {
  user: {},
  isLoggedIn: false,
  errors: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      console.log(action.user);
      return {
        ...state,
        user: action.user.user,
        isLoggedIn: action.user.logged_in,
        users: action.users,
        errors: "",
      };

    case "LOGIN_USER":
      console.log(initialState);
      console.log({
        ...state,
        user: action.user.user,
        isLoggedIn: action.user.logged_in,
      });
      return {
        ...state,
        user: action.user.user,
        isLoggedIn: action.user.logged_in,
        errors: "",
      };

    case "USER_ERROR":
      console.log(action.errors);
      return {
        ...state,
        isLoggedIn: false,
        errors: action.errors,
      };

    default:
      return state;
  }
};

export default usersReducer;
