import axios from "axios";

const baseURL = "http://localhost:3001";

const validateUser = (userObj) => {
  return {
    type: "LOGIN_USER",
    user: userObj,
  };
};

const errorCreator = (error) => {
  return {
    type: "USER_ERROR",
    error: error,
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    axios
      .post(`${baseURL}/login`, { user }, { withCredentials: true })
      .then((resp) => {
        if (resp.data.logged_in) {
          return dispatch(validateUser(resp.data));
        } else {
          return dispatch(errorCreator(resp.data.errors));
        }
      })
      .catch((error) => dispatch({ type: "USER_ERROR", error }));
  };
};

export const createUser = (user) => {
  return (dispatch) => {
    axios
      .post(`${baseURL}/users`, { user }, { withCredentials: true })
      .then((resp) => {
        if (resp.data.status === "created") {
          return dispatch({ type: "LOGIN_USER", user: resp.data.user });
        } else {
          return dispatch(errorCreator(resp.data.errors));
        }
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const loginStatus = () => {
  return (dispatch) => {
    axios
      .get(`${baseURL}/logged_in`, { withCredentials: true })
      .then((resp) => {
        if (resp.data.logged_in) {
          return dispatch(validateUser(resp.data));
        } else {
          return dispatch(errorCreator(resp.data.errors));
        }
      })
      .catch((error) => {
        return dispatch(errorCreator(error));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/logout", { withCredentials: true })
      .then((resp) => dispatch({ type: "LOGOUT_USER" }))
      .catch((error) => {
        return dispatch(errorCreator(error));
      });
  };
};
