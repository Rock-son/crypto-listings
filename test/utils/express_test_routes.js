"use strict";
const express = require('express');
 
// const app = express();

const { app } = require("../../server");
const { crypto, btc, details } = require("./cryptoData");

app.post("/api/getList", (req, res) => {
	let { id, currency } = req.body;
	currency = currency ? currency.trim().toUpperCase() : null;
	
	res.status(200).send(crypto);
});

app.post("/api/getDetails", (req, res) => {
	let { id, currency } = req.body;
	currency = currency ? currency.trim().toUpperCase() : null;
	
	res.status(200).json(details[currency]);
});

module.exports.app = app;
