"use strict";

import {
	FETCHING_DATA_START, FETCHING_DATA_FAIL, FETCHING_DATA_SUCCESS,
	OPEN_SETTINGS, CHANGE_SETTINGS
} from "Actions";
import { INITIALIZE_LIST } from "State";

/* eslint-disable import/prefer-default-export */
export function crypto(state = INITIALIZE_LIST, action) {
	switch (action.type) {
	case FETCHING_DATA_START:
		return {
			...state,
			isFetchingData: true,
			error: ""
		};
	case FETCHING_DATA_FAIL:
		return {
			...state,
			isFetchingData: false,
			error: action.error
		};
	case FETCHING_DATA_SUCCESS:
		return {
			...state,
			isFetchingData: false,
			data: action.data
		};
	case OPEN_SETTINGS:
		return {
			...state,
			openSettings: !state.openSettings
		};
	case CHANGE_SETTINGS:
		return {
			...state,
			currency: action.currency
		};
	default:
		return state;
	}
}
/* eslint-enable */
