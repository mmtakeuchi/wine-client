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

export const findVarietal = (varietalId) => {
  console.log(varietalId);
  return (dispatch) => {
    axios
      .get(`${baseURL}/${varietalId}`)
      .then((resp) => {
        console.log(resp);
        dispatch({ type: "FIND_VARIETAL", varietal: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};
