const baseURL = "http://localhost:3001/wines"

export const getWines = () => {
    return (dispatch) => {
        fetch(baseURL)
        .then(resp => console.log(resp))
        .then(wines => dispatch({type: 'GET_WINES', wines}))
    }
}
