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
      .get(baseURL)
      .then((resp) => {
        dispatch({ type: "GET_WINES", wines: resp.data });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const addWine = (wineObj) => {
  console.log(wineObj);
  return (dispatch) => {
    axios
      .post(baseURL, { wineObj })
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

export const editWine = ({ wineObj, id }) => {
  console.log(wineObj, id);

  const { brand, nose, taste, varietal_id, origin_id } = wineObj;
  return (dispatch) => {
    axios
      .patch(`${baseURL}/${id}`, {
        brand,
        nose,
        taste,
        varietal_id,
        origin_id,
      })
      .then((resp) => {
        return dispatch({ type: "EDIT_WINE", updatedWine: resp.data });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};

export const deleteWine = (wineId) => {
  return (dispatch) => {
    axios
      .delete(`${baseURL}/${wineId}`)
      .then((resp) => {
        return dispatch({ type: "DELETE_WINE", deleteWineId: wineId });
      })
      .catch((error) => dispatch(errorCreator(error)));
  };
};
