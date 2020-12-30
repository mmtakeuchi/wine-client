const baseURL = "http://localhost:3001/varietals"

export const getVarietals = () => {
    return (dispatch) => {
        fetch(baseURL)
        .then(resp => resp.json())
        .then(varietals => dispatch({type: 'GET_VARIETALS', varietals}))
    }
}
