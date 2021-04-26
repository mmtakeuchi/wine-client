import axios from "axios";
import { API_ROOT } from "../apiRoot";

const errorCreator = (error) => {
  return {
    type: "WINE_ERROR",
    error: error,
  };
};

export const getWines = () => {
  return (dispatch) => {
    axios
      .get(`${API_ROOT}/wines`)
      .then((resp) => {
        console.log(resp);
        if (resp.data) {
          return dispatch({ type: "GET_WINES", wines: resp.data });
        }
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const addWine = (wineObj) => {
  return (dispatch) => {
    axios
      .post(`${API_ROOT}/wines`, wineObj)
      .then((resp) => {
        if (resp.data) {
          return dispatch({ type: "ADD_WINE", newWine: resp.data });
        } else {
          return dispatch(errorCreator(resp.data.error));
        }
      })
      .catch((error) => {
        return dispatch(errorCreator(error));
      });
  };
};

export const getWine = (wineId) => {
  return (dispatch) => {
    axios
      .get(`${API_ROOT}/wines/${wineId}`)
      .then((resp) => {
        return dispatch({ type: "GET_WINE", wine: resp.data });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const filterWine = (varietalId) => {
  return (dispatch) => {
    axios
      .get(`${API_ROOT}/wines`)
      .then((resp) => {
        return dispatch({
          type: "FILTER_WINE",
          wine: resp.data,
          varietal: varietalId,
        });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const editWine = ({ wineObj, id }) => {
  return (dispatch) => {
    axios
      .patch(`${API_ROOT}/wines/${id}`, wineObj, { withCredentials: true })
      .then((resp) => {
        return dispatch({ type: "EDIT_WINE", updatedWine: resp.data });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const deleteWine = (wineId) => {
  return (dispatch) => {
    axios
      .delete(`${API_ROOT}/wines/${wineId}`, { withCredentials: true })
      .then((resp) => {
        return dispatch({ type: "DELETE_WINE", deleteWineId: wineId });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};
