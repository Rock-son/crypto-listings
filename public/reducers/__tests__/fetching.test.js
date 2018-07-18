"use strict";

import expect from "expect";
import { listReducer } from "../list";
import {
	FETCHING_DATA_START, FETCHING_DATA_FAIL, FETCHING_LIST_SUCCESS
} from "../../actions/actions";
import { INITIALIZE_LIST } from "../../actions/state";
import { crypto } from "../../../test/utils/cryptoData";

const error = "Erro Msg...";

// probably not best way to write reducer tests, when reducers change
it("handles actions of type FETCHING_LIST_SUCCESS", () => {
	const action = {
		type: FETCHING_LIST_SUCCESS,
		listData: crypto
	};

	const newState = listReducer(INITIALIZE_LIST, action);

	expect(newState).toEqual(expect.objectContaining({
		...INITIALIZE_LIST,
		isFetchingData: false,
		shouldUpdateList: false,
		listData: action.listData
	}));
});

it("handles actions of type FETCHING_LIST_FAIL", () => {
	const action = {
		type: FETCHING_DATA_FAIL,
		error
	};
	const newState = listReducer(INITIALIZE_LIST, action);
	expect(newState).toEqual(expect.objectContaining({
		...INITIALIZE_LIST,
		isFetchingData: false,
		error: action.error
	}));
});

it("handles actions of type FETCHING_LIST_START", () => {
	const action = {
		type: FETCHING_DATA_START,
		listData: crypto
	};
	const newState = listReducer(INITIALIZE_LIST, action);
	expect(newState).toEqual(expect.objectContaining({
		...INITIALIZE_LIST,
		isFetchingData: true,
		error: ""
	}));
});
