"use strict";

import React from "react";
import PropTypes from "prop-types";
import { whyDidYouUpdate } from "why-did-you-update";
import { hot } from "react-hot-loader";
import { Redirect } from "react-router";

import Toolbar from "./shared/Toolbar";
import List from "./shared/List";
import { spreadAndFilterData } from "./shared/helpers";


if (process.env.NODE_ENV !== 'production') {
	whyDidYouUpdate(React);
}


export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, info: "", redirect: false };
		this.handleClick = this.handleClick.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentDidMount() {
		const { fetchList, cryptoData: { currency, shouldUpdateList } } = this.props;
		if (shouldUpdateList) {
			return fetchList(currency, null);
		}
		return null;
	}

	componentDidCatch(/* error, */ info) {
		this.setState({ hasError: true, info });
	}

	handleClick(e) {
		e.preventDefault();
		const { selectId } = this.props;
		const id = e.target.id || e.target.parentNode.id;

		selectId(id);
		this.setState({ redirect: true });
	}

	handleUpdate(e) {
		if ((e.keyCode || 0) === 13 || e.type === "click") {
			const { fetchList, prepareUpdate, cryptoData: { currency } } = this.props;
			prepareUpdate("shouldUpdateList");
			fetchList(currency, null);
		}
	}

	/* eslint-disable react/jsx-indent-props */
	render() {
		const { hasError, redirect, info } = this.state;
		if (redirect) {
			return <Redirect to="/details" />;
		}
		const { cryptoData, cryptoData: { listData, currency } } = this.props;

		const desiredFields = ["id", "rank", "symbol", "price", "percent_change_24h"];
		const filterData = (() => spreadAndFilterData(desiredFields, listData.data, currency))();

		return (
			<div>
				<Toolbar currency={currency} handleUpdate={this.handleUpdate} />
				{hasError
					? (
						<h2 className="home__error">
							{`An error occured (${info})! Please try again later.`}
						</h2>
					)
					: (
						<List
							handleClick={this.handleClick}
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
Home.propTypes = {
	// REDUCERS
	cryptoData: PropTypes.instanceOf(Object),
	// DISPATCH FUNCTIONS
	selectId: PropTypes.func,
	fetchList: PropTypes.func,
	prepareUpdate: PropTypes.func
};

Home.defaultProps = {
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
	selectId: () => "",
	fetchList: () => [{ data: [], metadata: {} }],
	prepareUpdate: () => ({
		shouldUpdateList: true,
		shouldUpdateDetails: true
	})
};

export default hot(module)(Home);
