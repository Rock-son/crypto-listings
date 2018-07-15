"use strict";

import React from "react";
import PropTypes from "prop-types";
import { whyDidYouUpdate } from "why-did-you-update";
import { hot } from "react-hot-loader";

import Toolbar from "Toolbar";

if (process.env.NODE_ENV !== 'production') {
	whyDidYouUpdate(React);
}


class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.changeSettings(e.target.value);
	}

	render() {
		const { cryptoData: { currency }  } = this.props;
        
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

Settings.propTypes = {
	// REDUCERS
	cryptoData: PropTypes.instanceOf(Object).isRequired
};

export default hot(module)(Settings);
