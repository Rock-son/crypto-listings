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
		selectId: id => dispatch(SELECT_ID(id)),
		prepareUpdate: type => dispatch(PREPARE_FOR_UPDATE(type)),
		fetchList: (currency, id) => dispatch(FETCH_DATA(currency, id)),
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
