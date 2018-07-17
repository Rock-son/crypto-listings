"use strict";

import { combineReducers } from "redux";
import { listReducer } from "./list";


export default combineReducers({
	cryptoData: listReducer
});
