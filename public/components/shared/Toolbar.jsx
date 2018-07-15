"use strict";

import React from "react";
import { Link } from "react-router-dom";

export default function (props) {
	return (
		<section className="toolbar">
			<header>
				<nav>
					<ul className="toolbar__items" >
						<li className="toolbar__items__home" >
							<Link to="/">
								<i className="fa fa-home" title="Home" />
							</Link>
						</li>
						<li className="toolbar__items__currency" title="Selected currency">
							{props.currency}
						</li>
						<li className="toolbar__items__settings" >
							<Link to="/settings">
								<i className="fa fa-cog" title="Settings" />
							</Link>
						</li>
						<li className="toolbar__items__sync" >
							<i className="fa fa-retweet" title="Refresh data" onClick={props.handleUpdate} onKeyUp={props.handleUpdate}/>
						</li>
					</ul>
				</nav>
			</header>
		</section>
	);
}
