"use strict";

import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import rootReducer from "./reducers/index";

/* eslint-disable no-underscore-dangle, react/destructuring-assignment */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;
if (process.env.NODE_ENV === "development") {
	store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
	);
} else {
	store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
}


export default props => (
	<Provider store={store}>
		{props.children}
	</Provider>
);
