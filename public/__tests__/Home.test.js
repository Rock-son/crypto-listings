"use strict";

import React from 'react';
import expect from "expect";

import { shallow, mount, render } from 'enzyme';
import Home from "../components/Home";
import Toolbar from "../components/shared/Toolbar";
import List from "../components/shared/List";

describe("Home page should render a toolbar and a list", () => {
	it("Toolbar present?", () => {
		const wrapped = shallow(<Home />);

		expect(wrapped.find(Toolbar).length).toEqual(1);
	});
	it("Toolbar present?", () => {
		const wrapped = shallow(<Home />);

		expect(wrapped.find(List).length).toEqual(1);
	});
});
