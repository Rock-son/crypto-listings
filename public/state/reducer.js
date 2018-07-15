"use strict";

import { combineReducers } from "redux";

import {
	FETCHING_DATA_START, FETCHING_DATA_FAIL, FETCHING_LIST_SUCCESS, PREPARE_UPDATE,
	FETCHING_DETAILS_SUCCESS, OPEN_SETTINGS, CHANGE_SETTINGS, SET_SELECTED_ID
} from "Actions";
import { INITIALIZE_LIST } from "State";

/* eslint-disable import/prefer-default-export */
const listReducer = (state = INITIALIZE_LIST, action) => {
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
	case FETCHING_LIST_SUCCESS:
		return {
			...state,
			isFetchingData: false,
			shouldUpdateList: false,
			listData: action.listData
		};
	case FETCHING_DETAILS_SUCCESS:
		return {
			...state,
			isFetchingData: false,
			shouldUpdateDetails: false,
			detailsData: action.detailsData,
			selectedId: action.selectedId
		};
	case PREPARE_UPDATE:
		return {
			...state,
			[action.dataType]: true
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
