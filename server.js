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
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public")));
// BODY PARSERS
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.json({ type: ["json", "application/csp-report"] }));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(morgan({stream: accessLogStream}));

// SECURITY
helmet(app);

// LIMITER
app.use(limiter);


// LOG (Helmet-csp) CSP blocked requests
// app.post("/report-violation", Log.logged);

router(app);

// PUT ALL ROUTES ABOVE THIS LINE OF CODE! - NOT IN USE
if (process.env.NODE_ENV !== "production") {
	const webpackDevMiddleware = require("webpack-dev-middleware");
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpack = require("webpack");
	const webpackConfig = require("./webpack.config.js");

	const compiler = webpack(webpackConfig);

	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.path,
		stats: { colors: true }
	}));
	app.use(webpackHotMiddleware(compiler, {
		log: console.log
	}));
} else {
	// * NEEDED FOR REACT ROUTER HISTORY LIB
	app.get("*", (req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));
}


// SERVER
http.createServer(app)
	.listen(port, () => console.log(`Listening on port: ${port}`));
