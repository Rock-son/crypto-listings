"use strict";

import React from 'react';
import expect from "expect";

import { shallow, mount, render } from 'enzyme';
import Details from "../components/Details";
import Toolbar from "../components/shared/Toolbar";
import List from "../components/shared/List";

describe("Details page should render a toolbar and a list", () => {
	it("Toolbar present?", () => {
		const wrapped = shallow(<Details />);

		expect(wrapped.find(Toolbar).length).toEqual(1);
	});
	it("List present?", () => {
		const wrapped = shallow(<Details />);

		expect(wrapped.find(List).length).toEqual(1);
	});


});
