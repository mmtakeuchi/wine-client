const winesReducer = (state = {wines: []}, action) => {
    switch(action.type) {
        case 'GET_WINES':
            return {
                ...state, 
                wines: action.wines}

        default: 
            return state
    }
}

export default winesReducer;