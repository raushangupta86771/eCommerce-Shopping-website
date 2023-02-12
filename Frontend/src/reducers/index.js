import { combineReducers } from "redux";

// import authReducer from "./authReducer.js"
import productReducer from "./productReducer.js";
import cartReducer from "./CartReducer.js";
// import singlePostReducer from "./singlePostReducer";

export const reducers = combineReducers({productReducer,cartReducer})