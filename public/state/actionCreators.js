"use strict";

import {
	FETCHING_DATA_START, FETCHING_DATA_FAIL, FETCHING_DATA_SUCCESS,
	OPEN_SETTINGS, CHANGE_SETTINGS
} from "Actions";
import { fetchList, fetchDetails } from "Api";

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

function fetchReceived(json) {
	return {
		type: FETCHING_DATA_SUCCESS,
		data: json || []
	};
}

function shouldReturnResults(crypto, currency) {
	if (crypto.currency === currency) {
		return false;
	}
	return true;
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


// REDUX THUNK - GET LIST OR DETAILS
export function FETCH_DATA({ id, currency }) {
	return (dispatch, getState) => {
		if (id == null) {
			if (!shouldReturnResults(getState().crypto, currency.trim().toUpperCase())) {
				return Promise.resolve;
			}
			// FETCH LIST
			dispatch(fetchStart());
			return fetchList(currency)
				.then((json) => {
					if (json.status !== 200) {
						dispatch(fetchFail(json.metadata.error || "Error, try again!"));
					} else {
						dispatch(fetchReceived(json.data));
					}
				})
				.catch(error => dispatch(fetchFail(error)));
		}

		// FETCH DETAILS
		dispatch(fetchStart());
		return fetchDetails(id, currency)
			.then((json) => {
				if (json.status !== 200) {
					dispatch(fetchFail(json.metadata.error || "Error, try again!"));
				} else {
					dispatch(fetchReceived(json.data));
				}
			})
			.catch(error => dispatch(fetchFail(error)));
	};
}
