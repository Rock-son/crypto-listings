"use strict";

import home from "Home";
import details from "Details";
import settings from "Settings";
import { connect } from "react-redux";
import {
	FETCH_DATA, OPEN_SETTINGS_FUNC, CHANGE_SETTINGS_FUNC
} from "ActionCreators";


// Redux connect to props and dispatch actions
const mapStateToProps = function a(state) {
	return { ...state };
};


const mapDispatchToProps = function b(dispatch) {
	return {
		openSettings: () => dispatch(OPEN_SETTINGS_FUNC()),
		changeSettings: () => dispatch(CHANGE_SETTINGS_FUNC()),
		fetchList: currency => dispatch(FETCH_DATA({ id: null, currency })),
		fetchDetails: (id, currency) => dispatch(FETCH_DATA({ id, currency }))
	};
};

export const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(home);

export const Details = connect(
	mapStateToProps,
	mapDispatchToProps
)(details);

export const Settings = connect(
	mapStateToProps,
	mapDispatchToProps
)(settings);
