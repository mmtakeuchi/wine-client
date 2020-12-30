const baseURL = "http://localhost:3001/origins"

export const getOrigins = () => {
    return (dispatch) => {
        fetch(baseURL)
        .then(resp => resp.json())
        .then(origins => dispatch({type: 'GET_ORIGINS', origins}))
    }
}
