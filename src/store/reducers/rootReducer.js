import { combineReducers } from "redux";

import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
  alert: alertReducer,  
});

export default rootReducer;