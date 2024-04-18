//createReducer : create redux store
//apply middleware : middleware to store
//compose : compose mulitple store
//thunk : middleware from redux ---- asynchronous act to dispatch
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware) 
  )
);

export default store;
