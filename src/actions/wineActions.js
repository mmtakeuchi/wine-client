import axios from "axios";

const baseURL = "http://localhost:3001/wines";

export const getWines = () => {
  return (dispatch) => {
    axios
      .get(baseURL)
      .then((resp) => {
        dispatch({ type: "GET_WINES", wines: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};

export const addWine = ({ brand, nose, taste }) => {
  return (dispatch) => {
    axios
      .post(baseURL, { brand, nose, taste })
      .then((resp) => {
        console.log(resp);
        return dispatch({ type: "ADD_WINE", newWine: resp.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
