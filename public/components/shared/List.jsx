"use strict";

import React from "react";
import PropTypes from "prop-types";


/**
 * Returns table with table headers - uses all supplied data 
 *
 * @param {props: filterData, cryptoData [, handleClick ]} types...
 * @return {table}
 * 
 */
export default (props) => {
	let container = null;

	/* eslint-disable react/jsx-one-expression-per-line */
	const { filterData, handleClick, cryptoData: { isFetchingData } } = props;
	const listData = Array.isArray(filterData) ? filterData : [filterData];

	try {
		container = (
			<section className="list">
				<table style={ isFetchingData ? { opacity: 0 } : {opacity: 1} }>
					<thead>
						<tr>{Object.keys(listData[0] || []).map(key =>
							key === "id" ? null : (<th key={key}>{key.replace(/_/g, " ")}</th>))}
						</tr>
					</thead>
					<tbody>
						{listData.map(obj => (
							<tr key={obj.id.toString()} id={obj.id} onClick={handleClick || null}>
								{Object.keys(obj).map(key =>
									key === "id" ? null : (<td key={key} title={key}>{obj[key]}</td>))}
							</tr>
						))}
					</tbody>

				</table>
				<div className="list__spinner" style={ isFetchingData ? { opacity: "1" } : { opacity: "0" }}>
					<i className={ isFetchingData ? "fa fa-cog fa-spin" : "fa fa-cog" } />
				</div>
			</section>
		);
	} catch (error) {
		container = <div className="list__error" >{`No data available! (${error})`}</div>;
	}
	return container;
	
}
/* eslint-enable */
