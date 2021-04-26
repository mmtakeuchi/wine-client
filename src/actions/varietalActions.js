import axios from "axios";
import { API_ROOT } from "../apiRoot";

export const getVarietals = () => {
  return (dispatch) => {
    axios
      .get(`${API_ROOT}/varietals`)
      .then((resp) => {
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
