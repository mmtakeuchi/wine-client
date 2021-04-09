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

export const findOrigin = (originId) => {
  return (dispatch) => {
    axios
      .get(`${baseURL}/${originId}`)
      .then((resp) => {
        dispatch({ type: "FIND_ORIGIN", origin: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};
