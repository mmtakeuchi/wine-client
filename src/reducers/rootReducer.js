import { combineReducers } from 'redux'
import winesReducer from './winesReducer'
import originsReducer from './originsReducer'
import varietalsReducer from './varietalsReducer'

const rootReducer = combineReducers ({
    winesReducer,
    originsReducer,
    varietalsReducer
})

export default rootReducer;