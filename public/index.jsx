"use strict";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
// COMPONENTS
import { Home, Details, Settings } from "MappedState";

// REDUCERS
import rootReducer from "RootReducer";

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
let store;
if (process.env.NODE_ENV === "development") {
	store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
	);
} else {
	store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/settings" component={Settings} />
				<Route path="/details" component={Details} />
				<Redirect path="*" to="/" />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
);
