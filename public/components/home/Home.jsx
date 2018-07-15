"use strict";

import React from "react";
import PropTypes from "prop-types";
import { whyDidYouUpdate } from "why-did-you-update";
import { hot } from "react-hot-loader";
import { Redirect } from "react-router";

import Toolbar from "Toolbar";
import List from "List";
import { spreadAndFilterData } from "Helpers";
import "../style/index";

if (process.env.NODE_ENV !== 'production') {
	whyDidYouUpdate(React);
}


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, info: "", redirect: false };
		this.handleClick = this.handleClick.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	componentDidMount() {
		const { fetchList, cryptoData: { currency, shouldUpdateList } } = this.props;
		shouldUpdateList ? fetchList(currency, null) : (void 0);
	}

	componentDidCatch(/* error, */ info) {
		this.setState({ hasError: true, info });
	}

	handleClick(e) {
		e.preventDefault();
		const { selectId } = this.props;
		const id = e.target.id || e.target.parentNode.id;
		
		selectId(id);
		this.setState({redirect: true});
	}

	handleUpdate(e) {
		if ((e.keyCode || 0) === 13 || e.type === "click") {
			const { fetchList, prepareUpdate, cryptoData: { currency, selectedId } } = this.props;
			prepareUpdate("shouldUpdateList");
			fetchList(currency, null)
		}
	}

	/* eslint-disable react/jsx-indent-props */
	render() {		
        if (this.state.redirect) {
			return <Redirect to="/details" />;
		}
		const { cryptoData, cryptoData: { listData, currency } } = this.props;
		const { hasError } = this.state;
		const desiredFields = ["id", "rank", "symbol", "price", "percent_change_24h"];
		const filterData = (() => spreadAndFilterData(desiredFields, listData.data, currency))();

		return (
			<div>
				<Toolbar currency={currency} handleUpdate={this.handleUpdate}/>
				{this.state.hasError ?
				(
					<h2 className="home__error">{`An error occured (${this.state.info})! Please try again later.`}</h2>
				):
				(	
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
	cryptoData: PropTypes.instanceOf(Object).isRequired,
	// DISPATCH FUNCTIONS
	fetchList: PropTypes.func
};

Home.defaultProps = {
	fetchList: () => [{ data: [], metadata: {} }]
};

export default hot(module)(Home);
