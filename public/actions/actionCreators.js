"use strict";

import {
	FETCHING_DATA_START, FETCHING_DATA_FAIL, FETCHING_LIST_SUCCESS, PREPARE_UPDATE,
	FETCHING_DETAILS_SUCCESS, OPEN_SETTINGS, CHANGE_SETTINGS, SET_SELECTED_ID
} from "./actions";
import { fetchList, fetchDetails } from "./api";

const LIST = "list";
const DETAILS = "details";

// DATA ACTIONS
function fetchStart() {
	return {
		type: FETCHING_DATA_START
	};
}

function fetchFail(error) {
	return {
		type: FETCHING_DATA_FAIL,
		error
	};
}

function fetchListReceived(json) {
	return {
		type: FETCHING_LIST_SUCCESS,
		listData: json || { data: [], metadata: {} }
	};
}

function fetchDetailsReceived(json, selectedId) {
	return {
		type: FETCHING_DETAILS_SUCCESS,
		detailsData: json || { currency: { data: [] }, btc: { data: [] } },
		selectedId
	};
}

export function PREPARE_FOR_UPDATE(type) {
	return {
		type: PREPARE_UPDATE,
		dataType: type
	};
}

export function SELECT_ID(id) {
	return {
		type: SET_SELECTED_ID,
		id
	}
}
// SETTINGS ACTIONS
export function OPEN_SETTINGS_FUNC() {
	return {
		type: OPEN_SETTINGS
	};
}

export function CHANGE_SETTINGS_FUNC(currency) {
	return {
		type: CHANGE_SETTINGS,
		currency
	};
}

function shouldReturnResults(cryptoData, type) {
	if (type === LIST && !cryptoData.shouldUpdateList) {
		return false;
	}
	if (type === DETAILS && !cryptoData.shouldUpdateDetails) {
		return false;
	}

	return true;
}

// REDUX THUNK - GET LIST OR DETAILS
export function FETCH_DATA(currency, id = null) {
	return (dispatch, getState) => {
		if (id == null) {
			if (!shouldReturnResults(getState().cryptoData, LIST)) {
				return Promise.resolve;
			}
			// FETCH LIST
			dispatch(fetchStart());
			return fetchList(currency)
				.then((json) => {
					if (json.status !== 200) {
						return dispatch(fetchFail(json.data.metadata.error || "Error, try again!"));
					}
					return dispatch(fetchListReceived(json.data));
				})
				.catch(error => dispatch(fetchFail(error)));
		}

		if (!shouldReturnResults(getState().cryptoData, DETAILS)) {
			return Promise.resolve;
		}
		// FETCH DETAILS
		dispatch(fetchStart());
		return fetchDetails(id, currency)
			.then((json) => {
				if (json.status !== 200) {
					return dispatch(fetchFail(json.data.btc.metadata.error || "Error, try again!"));
				}
				return dispatch(fetchDetailsReceived(json.data, id));
			})
			.catch(error => dispatch(fetchFail(error)));
	};
}
