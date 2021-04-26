import axios from "axios";
import { API_ROOT } from "../apiRoot";

export const getVarietals = () => {
  console.log(`${API_ROOT}/varietals`);
  return (dispatch) => {
    axios
      .get(`${API_ROOT}/varietals`)
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
  return (dispatch) => {
    axios
      .get(`${API_ROOT}/varietals/${varietalId}`)
      .then((resp) => {
        return dispatch({ type: "FIND_VARIETAL", varietal: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};
