import { combineReducers } from "redux";
import winesReducer from "./winesReducer";
import originsReducer from "./originsReducer";
import varietalsReducer from "./varietalsReducer";

const rootReducer = combineReducers({
  wines: winesReducer,
  origins: originsReducer,
  varietals: varietalsReducer,
});

export default rootReducer;
