import axios from "axios";

const baseURL = "http://localhost:3001/varietals";

export const getVarietals = () => {
  return (dispatch) => {
    axios
      .get(baseURL)
      .then((resp) => {
        console.log(resp);
        return dispatch({ type: "GET_VARIETALS", varietals: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};

export const findVarietal = (varietalId) => {
  console.log(`${baseURL}/${varietalId}`);
  return (dispatch) => {
    axios
      .get(`${baseURL}/${varietalId}`)
      .then((resp) => {
        return dispatch({ type: "FIND_VARIETAL", varietal: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};
