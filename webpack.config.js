"use strict";

const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


// HTML_WEBPACK_PLUGIN
const TEMPLATE_IN = "./public/template.html";
const TEMPLATE_OUT = "./index.html";
// BUNDLE ENTRY & OUTPUT
const BUNDLE = path.join(__dirname, "public", "index.jsx");
const OUTPUT = path.join(__dirname, "dist");
// check environment
var __DEV__ = process.env.NODE_ENV !== 'production';
// LIBS (files that don't change much)
const VENDOR_LIBS = ["react", "react-dom", "redux", "react-redux", "react-router", "react-router-dom", "redux-thunk"];



const config = {
	entry: {
		bundle: BUNDLE,
		vendor: VENDOR_LIBS
	},
	output: {
		path: OUTPUT,
		filename:  __DEV__ ? "[name].js" : "[name]-[hash].js"
	},
	resolve: {
		// for components reusability - but problem with tests that don't execute with webpack
		alias: {
			// HOME
			Home: path.join(__dirname, "public/components/Home.jsx"),
			List: path.join(__dirname, "public/components/shared/List.jsx"),
			Details: path.join(__dirname, "public/components/Details.jsx"),
			Toolbar: path.join(__dirname, "public/components/shared/Toolbar.jsx"),
			Settings: path.join(__dirname, "public/components/Settings.jsx"),
			MappedState: path.join(__dirname, "public/components/_mapProps.js"),
			Helpers: path.join(__dirname, "public/components/shared/helpers.js"),
			// STATE
			State: path.join(__dirname, "public/actions/state.js"),
			Actions: path.join(__dirname, "public/actions/actions.js"),
			ActionCreators: path.join(__dirname, "public/actions/actionCreators.js"),
			Api: path.join(__dirname, "public/actions/api.js"),
			RootReducer: path.join(__dirname, "public/reducers/index.js")
		},
		extensions: [".js", ".jsx", ".scss"]
	},
	devtool: __DEV__ ? "inline-source-map" : "source-map",
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: "babel-loader",
				exclude: /(node_modules)/},
			{
				test: /\.scss$/,
				use:ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader",
						options: { importLoaders: 1 }
					},
					"resolve-url-loader",
					"postcss-loader",
					"sass-loader"
					]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "[name].[contenthash].css"
		}),
		// extract vendor and webpack's module manifest and inline it in the dist HTML
		new webpack.optimize.CommonsChunkPlugin({
			names: ["vendor", "manifest"],
			minChunks: Infinity
		}),
		// extract common modules from all the chunks (requires no 'name' property)
		new webpack.optimize.CommonsChunkPlugin({
			async: true,
			children: true,
			minChunks: 4
		}),
		new HtmlWebpackPlugin({
			template: TEMPLATE_IN,
			filename: TEMPLATE_OUT// target path
		}),
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify(__DEV__ ? "development" : "production")
			},
			__DEVTOOLS__: !__DEV__
		})
	]
}

if (!__DEV__) {
	config.plugins.push(
		new UglifyJsPlugin({
			cache: true,
			sourceMap: true,
			parallel: true,
			uglifyOptions : {
				ecma: 6,
				warnings: false,
				mangle: true
			}
		}));
} else {
	config.plugins.push(new FriendlyErrorsWebpackPlugin());
	config.devServer = {
		contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "public")],
		hot: true,
		quiet: true
	};
}

module.exports = config;
