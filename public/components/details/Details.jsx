"use strict";

import React from "react";
import PropTypes from "prop-types";
import { whyDidYouUpdate } from "why-did-you-update";
import { hot } from "react-hot-loader";

import Toolbar from "Toolbar";
import List from "List";
import { spreadAndFilterData } from "Helpers";

if (process.env.NODE_ENV !== 'production') {
	whyDidYouUpdate(React);
}


class Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, info: "" };
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentDidMount() {
		const { fetchDetails, cryptoData: { currency, selectedId, shouldUpdateDetails } } = this.props;
		shouldUpdateDetails ? fetchDetails(currency, selectedId) : (void 0);
	}

	componentDidCatch(/* error, */ info) {
		this.setState({ hasError: true, info });
	}

	handleUpdate(e) {
		if ((e.keyCode || 0) === 13 || e.type === "click") {
			const { fetchDetails, prepareUpdate, cryptoData: { currency, selectedId } } = this.props;
			prepareUpdate("shouldUpdateDetails");
			fetchDetails(currency, selectedId) 
		}
	}

	/* eslint-disable react/jsx-indent-props */
	render() {
        const { cryptoData, cryptoData: { detailsData, currency } } = this.props;
		const { hasError } = this.state;

		const desiredFields_1 = ["id", "rank", "name", "symbol", "price", "volume_24h", "market_cap"];
		const filterData_currency = (() => spreadAndFilterData(desiredFields_1, detailsData.currency.data, currency))();

		const desiredFields_2 = ["price", "percent_change_1h", "percent_change_24h", "percent_change_7d", "max_supply", "circulating_supply"];
		const filterData_btc = (() => spreadAndFilterData(desiredFields_2, detailsData.btc.data, "BTC"))();
        const filterData = {...filterData_currency[0], ...filterData_btc[0]};
		return (
			<div>
				<Toolbar currency={currency} handleUpdate={this.handleUpdate}/>
				{this.state.hasError ?
				(
					<h2>{`An error occured (${this.state.info})! Please try again later.`}</h2>
				):
				(	
					<List
						cryptoData={cryptoData}
						filterData={filterData}
						error={hasError}
					/>
				)}
			</div>
		);
	}
}
/* eslint-enable */
Details.propTypes = {
	// REDUCERS
	cryptoData: PropTypes.instanceOf(Object).isRequired,
	// ACTION CREATORS
	fetchDetails: PropTypes.func
};

Details.defaultProps = {
	fetchDetails: () => [{ currency: { data: [] }, btc: { data: [] } }]
};

export default hot(module)(Details);
