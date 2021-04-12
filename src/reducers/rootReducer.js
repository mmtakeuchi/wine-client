import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import winesReducer from "./winesReducer";
import originsReducer from "./originsReducer";
import varietalsReducer from "./varietalsReducer";

const rootReducer = combineReducers({
  current: usersReducer,
  wines: winesReducer,
  origins: originsReducer,
  varietals: varietalsReducer,
});

export default rootReducer;
