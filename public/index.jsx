"use strict";

import React from "react";
import ReactDOM from "react-dom";

import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
// COMPONENTS
import { Home, Details, Settings } from "./components/_mapProps";
import "./components/style/index";
import Root from "./root";


ReactDOM.render(
	<Root>
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/settings" component={Settings} />
				<Route path="/details" component={Details} />
				<Redirect path="*" to="/" />
			</Switch>
		</Router>
	</Root>,
	document.getElementById("root")
);
