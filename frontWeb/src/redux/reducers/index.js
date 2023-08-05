import { combineReducers } from "redux";

import AuthReducer from "./auth.reducer";
import courseReducer from "./cours.reducer";
import commentReducer from "./comment.reducer";
import messageReducer from "./messages.reducer";

const allReducers = {
  // Put all of the reducers here!
  auth: AuthReducer,
  cours: courseReducer,
  comment: commentReducer,
  message: messageReducer,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
