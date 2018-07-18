"use strict";

import React from "react";
import PropTypes from "prop-types";
import { whyDidYouUpdate } from "why-did-you-update";
import { hot } from "react-hot-loader";

import Toolbar from "./shared/Toolbar";

if (process.env.NODE_ENV !== 'production') {
	whyDidYouUpdate(React);
}


export class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		const { changeSettings } = this.props;
		changeSettings(e.target.value);
	}

	/* eslint-disable react/jsx-one-expression-per-line */
	render() {
		const { cryptoData: { currency } } = this.props;
		return (
			<div>
				<Toolbar currency={currency} />
				<select id="currency" className="settings" onChange={this.handleClick} value={currency}>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="CNY">CNY</option>
				</select>
			</div>
		);
	}
}
/* eslint-enable */
Settings.propTypes = {
	// REDUCERS
	cryptoData: PropTypes.instanceOf(Object),
	changeSettings: PropTypes.func
};

Settings.defaultProps = {
	cryptoData: {
		isFetchingData: false,
		error: "",
		listData: { data: [], metadata: {} },
		detailsData: { currency: { data: [] }, btc: { data: [] } },
		selectedId: "",
		currency: "USD",
		shouldUpdateList: true,
		shouldUpdateDetails: true,
		openSettings: false
	},
	changeSettings: () => ({
		currency: "USD",
		shouldUpdateList: true,
		shouldUpdateDetails: true
	})
};
export default hot(module)(Settings);
