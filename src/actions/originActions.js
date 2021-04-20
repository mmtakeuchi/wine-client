import axios from "axios";
import { API_ROOT } from "../apiRoot";

export const getOrigins = () => {
  return (dispatch) => {
    axios
      .get(`${API_ROOT}/origins`)
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
      .get(`${API_ROOT}/origins/${originId}`)
      .then((resp) => {
        dispatch({ type: "FIND_ORIGIN", origin: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};
