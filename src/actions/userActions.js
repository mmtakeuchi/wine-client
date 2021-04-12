import axios from "axios";

const baseURL = "http://localhost:3001";

export const loginUser = (user) => {
  return (dispatch) => {
    axios
      .post(`${baseURL}/login`, { user }, { withCredentials: true })
      .then((resp) => {
        console.log(resp);
        if (resp.data.logged_in) {
          return dispatch({ type: "LOGIN_USER", user: resp.data });
        } else {
          return dispatch({ type: "USER_ERROR", errors: resp.data.errors });
        }
      })
      .catch((error) => dispatch({ type: "USER_ERROR", error }));
  };
};

export const loginStatus = () => {
  return (dispatch) => {
    axios
      .get(`${baseURL}/logged_in`, { withCredentials: true })
      .then((resp) => {
        console.log(resp);
        if (resp.data.logged_in) {
          return dispatch({ type: "LOGIN_USER", user: resp.data });
        } else {
          return dispatch({ type: "USER_ERROR", errors: resp.data.errors });
        }
      })
      .catch((error) => {
        console.log(error);
        return dispatch({ type: "USER_ERROR", error });
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/logout", { withCredentials: true })
      .then((resp) => dispatch({ type: "LOGOUT_USER" }))
      .catch((error) => {
        console.log(error);
        return dispatch({ type: "USER_ERROR", error });
      });
  };
};
