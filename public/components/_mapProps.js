"use strict";

import { connect } from "react-redux";

import Home from "./Home";
import Details from "./Details";
import Settings from "./Settings";
import {
	FETCH_DATA, PREPARE_FOR_UPDATE, SELECT_ID, OPEN_SETTINGS_FUNC, CHANGE_SETTINGS_FUNC
} from "../actions/actionCreators";

// Redux connect to props and dispatch actions
const mapStateToProps = function a(state) {
	return { ...state };
};


const mapDispatchToProps = function b(dispatch) {
	return {
		openSettings: () => dispatch(OPEN_SETTINGS_FUNC()),
		changeSettings: currency => dispatch(CHANGE_SETTINGS_FUNC(currency)),
		selectId: id => dispatch(SELECT_ID(id)),
		prepareUpdate: type => dispatch(PREPARE_FOR_UPDATE(type)),
		fetchList: (currency, id) => dispatch(FETCH_DATA(currency, id)),
		fetchDetails: (currency, id) => dispatch(FETCH_DATA(currency, id))
	};
};

const home = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

const details = connect(
	mapStateToProps,
	mapDispatchToProps
)(Details);

const settings = connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);

export default {
	Home: home,
	Settings: settings,
	Details: details
};
