"use strict";

// if development
if (process.env.HEROKU_RUN == null) {
	require("dotenv").config();
}

const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const serveStatic = require('serve-static');
const favicon = require('serve-favicon');
// EXPRESS LIMITER
const RateLimiter = require("express-rate-limit");
// SECURITY
const helmet = require("./security/helmet.js");
/* LOGGING:
    morgan = require("morgan"),
	Log = require("./logs/services/morganLog"),
	accessLogStream = fs.createWriteStream(path.join(__dirname, "logs", "access.log"), {flags: "a"})
*/
// PORT & ROUTER
const router = require("./server-router.js");

const port = process.env.PORT || 8080;
const app = express();

const limiter = new RateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200, // limit each IP to 200 requests per windowMs (fonts, jpeg, css)
	delayMs: 0 // disable delaying - full speed until the max limit is reached
});

// APP
app.set("views", path.join(__dirname, "dist"));
app.set("view engine", "pug");
// ROUTES
app.use(serveStatic(path.join(__dirname, "dist")));
app.use(serveStatic(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, 'public/assets/', 'favicon.ico')));
// BODY PARSERS
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.json({ type: ["json", "application/csp-report"] }));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(morgan({stream: accessLogStream}));

// SECURITY
// helmet(app);

// LIMITER
app.use(limiter);


// LOG (Helmet-csp) CSP blocked requests
// app.post("/report-violation", Log.logged);

router(app);


app.get("/", (req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));

process.on('unhandledRejection', (err) => {
	console.log("Error", err);
});

// SERVER
http.createServer(app)
	.listen(port, () => console.log(`Listening on port: ${port}`));

module.exports.app = app;
