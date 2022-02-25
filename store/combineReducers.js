import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import tokenReducer from "./reducers/tokenReducer";

export default combineReducers({
  userReducer,
  tokenReducer,
});
