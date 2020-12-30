const originsReducer = (state = {origins: []}, action) => {
    switch(action.type) {
        case 'GET_ORIGINS':
            return {
                ...state, 
                origins: action.origins}

        default: 
            return state
    }
}

export default originsReducer;