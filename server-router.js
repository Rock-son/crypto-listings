"use strict";

// API
const axios = require("axios");


module.exports = function a(app) {
	// INITIALIZE LIST
	app.post("/api/getCryptocurrencyList", (req, res) => {
		let { currency } = req.body;
		currency = currency ? currency.trim().toUpperCase() : null;

		if (currency == null) {
			return setTimeout(() => res.status(400)
				.send("Please select a currency!"), 300);
		}
		if (!["USD", "EUR", "CNY"].filter(item => item === currency).length) {
			return setTimeout(() => res.status(400)
				.send("Please select a valid currency!"), 300);
		}

		axios({
			method: "get",
			url: `https://api.coinmarketcap.com/v2/ticker/?sort=rank&structure=array&convert=${currency}`,
			timeout: 2000,
			validateStatus: status => status < 500 // Reject if the status code < 500
		})
			.then(response => res.status(200).send(response.data))
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					return res.status(error.response.status)
						.send(error.response.data, error.response.header);
				}
				if (error.request) {
					// The request was made but no response was received `error.request`
					// is an instance of http.ClientRequest in node.js
					return res.status(400).send(error.request);
				}
				return res.status(400).send(error.message);
			});
	});

	// GET CRYPTOCURRENCY DETAILS
	app.post("/api/getCryptocurrencyDetails", (req, res) => {
		let { id, currency } = req.body;
		currency = currency ? currency.trim().toUpperCase() : null;
		
		if (id == "" || id == null || currency == null) {
			return setTimeout(() => res.status(400)
				.send("Please select a cryptocurrency!"), 300);
		}
		if (id < 1) {
			return setTimeout(() => res.status(400)
				.send("Please select a valid cryptocurrency!"), 300);
		}
		if (!["USD", "EUR", "CNY"].filter(item => item === currency).length) {
			return setTimeout(() => res.status(400)
				.send("Please select a valid currency!"), 300);
		}


		const currencyPromise = axios({
			method: "get",
			url: `https://api.coinmarketcap.com/v2/ticker/${req.body.id}/?structure=array
				&convert=${currency}`,
			timeout: 2000,
			validateStatus: status => status < 500 // Reject if the status code < 500
		});
		const BTCPromise = axios({
			method: "get",
			url: `https://api.coinmarketcap.com/v2/ticker/${req.body.id}/?structure=array
				&convert=BTC`,
			timeout: 2000,
			validateStatus: status => status < 500 // Reject if the status code < 500
		});

		Promise.all([currencyPromise, BTCPromise]).then(response => {
			return res.status(200).send({currency: response[0].data, btc: response[1].data});
		})
		.catch(error => {
			if (error.response) {
				// The request was made and the server responded with a status code that falls out of the range of 2xx
				return res.status(error.response.status).send(error.response.data);
			}
			if (error.request) {
				// The request was made but no response was received `error.request` is an instance of http.ClientRequest in node.js
				return res.status(400).send(error.request);
			}
			return res.status(400).send(error.message);
		});		
	});
}
