import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// for redux dev tools extension to work
import { composeWithDevTools } from "redux-devtools-extension";

// root reducer
import rootReducer from "./reducers/rootReducer.js";
// initial state
const initialState = {};
// middlewares
const middlewares = [thunk];

// create store general ver.
// const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))

// create store this particular ver.
const store = createStore(  
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;