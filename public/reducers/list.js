"use strict";

import { combineReducers } from "redux";

import {
	FETCHING_DATA_START, FETCHING_DATA_FAIL, FETCHING_LIST_SUCCESS, PREPARE_UPDATE,
	FETCHING_DETAILS_SUCCESS, OPEN_SETTINGS, CHANGE_SETTINGS, SET_SELECTED_ID
} from "../actions/actions";
import { INITIALIZE_LIST } from "../actions/state";

/* eslint-disable import/prefer-default-export */
export const listReducer = (state = INITIALIZE_LIST, action) => {
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
	case SET_SELECTED_ID:
		return {
			...state,
			selectedId: action.id,
			shouldUpdateDetails: true

		};
	case OPEN_SETTINGS:
		return {
			...state,
			openSettings: !state.openSettings
		};
	case CHANGE_SETTINGS:
		return {
			...state,
			currency: action.currency,
			shouldUpdateList: true,
			shouldUpdateDetails: true
		};
	default:
		return state;
	}
};
/* eslint-enable */
