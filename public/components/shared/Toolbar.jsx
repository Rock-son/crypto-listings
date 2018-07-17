"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Toolbar(props) {
	const { handleUpdate, currency } = props;

	return (
		<section className="toolbar">
			<header>
				<nav>
					<ul className="toolbar__items">
						<li className="toolbar__items__home">
							<Link to="/">
								<i className="fa fa-home" title="Home" />
							</Link>
						</li>
						<li className="toolbar__items__currency" title="Selected currency">
							{currency}
						</li>
						<li className="toolbar__items__settings">
							<Link to="/settings">
								<i className="fa fa-cog" title="Settings" />
							</Link>
						</li>
						<li className="toolbar__items__sync">
							{/* eslint-disable react/jsx-indent-props */}
							<i
								className="fa fa-retweet"
								role="button"
								tabIndex={0}
								title="Refresh data"
								onClick={handleUpdate}
								onKeyUp={handleUpdate}
							/>
							{/* eslint-enable */}
						</li>
					</ul>
				</nav>
			</header>
		</section>
	);
}

Toolbar.propTypes = {
	// PROPS
	handleUpdate: PropTypes.func,
	currency: PropTypes.string
};

Toolbar.defaultProps = {
	handleUpdate: () => [{}],
	currency: "USD"
};
