"use strict";

import axios from "axios";

const validateStatus = () => status => status < 500; // Reject if the status is > 500

export default {
	fetchList: currency => axios({
		method: "post",
		url: `api/getCryptocurrencyList`,
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			currency
		},
		validateStatus
	}),
	fetchDetails: (id, currency) => axios({
		method: "post",
		url: `api/getCryptocurrencyDetails`,
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			id,
			currency
		},
		validateStatus
	})
};
