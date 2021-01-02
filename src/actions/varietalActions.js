import axios from "axios";

const baseURL = "http://localhost:3001/varietals";

export const getVarietals = () => {
  return (dispatch) => {
    axios
      .get(baseURL)
      .then((resp) => {
        dispatch({ type: "GET_VARIETALS", varietals: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};

export const getVarietal = (id) => {
  return (dispatch) => {
    axios
      .get(baseURL)
      .then((resp) => {
        dispatch({ type: "GET_VARIETAL", varietal: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};
