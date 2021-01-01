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

// export const addShoe = (shoe) => {
//     return (dispatch) => {
//         const strongParams = {
//             shoe: {
//                name: shoe.name,
//                picture: shoe.picture,
//                color: shoe.color,
//                size: shoe.size,
//                condition: shoe.condition,
//                brand_id: shoe.brand_id
//             }
//         }
//         fetch(shoeURL, {
//             method: "POST",
//             headers: {
//                 "Accepts": "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(strongParams)
//         })
//         .then(resp => resp.json())
//         .then(shoe => dispatch({type: 'ADD_SHOE', shoe}))
//         .catch(errors => console.log(errors))
//     }
// }
