import axios from "axios";

const baseURL = "http://localhost:3001/wines";

const errorCreator = (error) => {
  return {
    type: "WINE_ERROR",
    error: error,
  };
};

export const getWines = () => {
  return (dispatch) => {
    axios
      .get(baseURL, { withCredentials: true })
      .then((resp) => {
        if (resp.data) {
          console.log(resp);
          return dispatch({ type: "GET_WINES", wines: resp.data });
        }
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const addWine = (wineObj) => {
  return (dispatch) => {
    axios
      .post(baseURL, wineObj)
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
      .get(`${baseURL}/${wineId}`)
      .then((resp) => {
        return dispatch({ type: "GET_WINE", wine: resp.data });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const filterWine = (varietalId) => {
  return (dispatch) => {
    axios
      .get(baseURL)
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
      .patch(`${baseURL}/${id}`, wineObj, { withCredentials: true })
      .then((resp) => {
        console.log(resp);
        return dispatch({ type: "EDIT_WINE", updatedWine: resp.data });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const deleteWine = (wineId) => {
  return (dispatch) => {
    axios
      .delete(`${baseURL}/${wineId}`, { withCredentials: true })
      .then((resp) => {
        return dispatch({ type: "DELETE_WINE", deleteWineId: wineId });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};
