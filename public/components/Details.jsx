"use strict";

import React from "react";
import PropTypes from "prop-types";
import { whyDidYouUpdate } from "why-did-you-update";
import { hot } from "react-hot-loader";

import Toolbar from "./shared/Toolbar";
import List from "./shared/List";
import { spreadAndFilterData } from "./shared/helpers";

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
		if (shouldUpdateDetails) {
			fetchDetails(currency, selectedId);
		}
	}

	componentDidCatch(/* error, */ info) {
		this.setState({ hasError: true, info });
	}

	handleUpdate(e) {
		if ((e.keyCode || 0) === 13 || e.type === "click") {
			const { fetchDetails, prepareUpdate, cryptoData: { currency, selectedId } } = this.props;
			prepareUpdate("shouldUpdateDetails");
			fetchDetails(currency, selectedId);
		}
	}

	/* eslint-disable react/jsx-indent-props */
	render() {
		const { cryptoData, cryptoData: { detailsData, currency } } = this.props;
		const { hasError, info } = this.state;

		const desiredFields1 = ["id", "rank", "name", "symbol", "price", "volume_24h", "market_cap"];
		const filterDataCurrency = (() => spreadAndFilterData(desiredFields1, detailsData.currency.data, currency))();

		const desiredFields2 = ["price", "percent_change_1h", "percent_change_24h",	"percent_change_7d", "max_supply",
			"circulating_supply"];
		const filterDataBtc = (() => spreadAndFilterData(desiredFields2, detailsData.btc.data, "BTC"))();
		const filterData = { ...filterDataCurrency[0], ...filterDataBtc[0] };
		return (
			<div>
				<Toolbar currency={currency} handleUpdate={this.handleUpdate} />
				{hasError
					? (
						<h2>
							{`An error occured (${info})! Please try again later.`}
						</h2>
					)
					: (
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
	cryptoData: PropTypes.instanceOf(Object),
	// ACTION CREATORS
	fetchDetails: PropTypes.func,
	prepareUpdate: PropTypes.func
};

Details.defaultProps = {
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
	fetchDetails: () => [{ currency: { data: [] }, btc: { data: [] } }],
	prepareUpdate: () => ({
		shouldUpdateList: true,
		shouldUpdateDetails: true
	})
};

export default hot(module)(Details);
