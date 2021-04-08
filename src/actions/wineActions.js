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

export const addWine = ({ brand, nose, taste, varietal_id, origin_id }) => {
  return (dispatch) => {
    axios
      .post(baseURL, { brand, nose, taste, varietal_id, origin_id })
      .then((resp) => {
        console.log(resp);
        return dispatch({ type: "ADD_WINE", newWine: resp.data });
      })
      .catch((error) => {
        console.log(error);
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
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};

export const editWine = ({ brand, nose, taste, varietal_id, origin_id }) => {
  return (dispatch) => {
    axios
      .patch(baseURL, { brand, nose, taste, varietal_id, origin_id })
      .then((resp) => {
        console.log(resp.data);
        return dispatch({ type: "EDIT_WINE", updatedWine: resp.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteWine = (wineId) => {
  return (dispatch) => {
    axios
      .delete(`${baseURL}/${wineId}`)
      .then((resp) => {
        console.log(resp.data);
        return dispatch({ type: "DELETE_WINE", deleteWine: resp.data });
      })
      .catch((errors) => {
        return Promise.reject(errors);
      });
  };
};
