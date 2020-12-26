import { combineReducers } from 'redux'
import winesReducer from './actions/winesReducer'
import originsReducer from './actions/originsReducer'
import varietalsReducer from './actions/varietalsReducer'

const rootReducer = combineReducers ({
    wines: winesReducer,
    origins: originsReducer,
    varietals: varietalsReducer
})

export default rootReducer;