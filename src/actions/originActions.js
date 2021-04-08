import axios from "axios";

const baseURL = "http://localhost:3001/origins";

export const getOrigins = () => {
  return (dispatch) => {
    axios
      .get(baseURL)
      .then((resp) => {
        dispatch({ type: "GET_ORIGINS", origins: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};
