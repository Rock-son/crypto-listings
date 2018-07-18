"use strict";

import React from 'react';
import expect from "expect";
import 'jsdom-global/register'; 
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import { shallow, mount, simulate, update } from 'enzyme';
import { Home } from "../components/Home";
import Toolbar from "../components/shared/Toolbar";
import List from "../components/shared/List";
// import Root from "../root";

import { INITIALIZE_LIST } from "../actions/state";
import { crypto } from "../../test/utils/cryptoData";


// import mock context
const options = new ReactRouterEnzymeContext();
const selectId = jest.fn();
const fetchList = jest.fn();
const prepareUpdate = jest.fn();
let wrapped;


beforeEach(() => {
	wrapped = mount(<Home />, options.get());
});
afterEach(() => {
    wrapped.unmount();
});


describe("HOME PAGE RENDERING:", () => {
	it("Should render Toolbar component", () => {
		expect(wrapped.find(Toolbar).length).toEqual(1);
	});
	it("Should render List component", () => {
		expect(wrapped.find(List).length).toEqual(1);
	});
});


describe("HOME PAGE SUBCOMPONENT RENDERING:", () => {
	it("Should fill a List with listData (data.length + 1 header)", () => {
		wrapped.setProps({ cryptoData: { ...INITIALIZE_LIST, listData: crypto }});
		
		// +1 header
		expect(wrapped.find("tr").length).toEqual(crypto.data.length + 1);
	});

	it("Should redirect after clicked on loaded List and call selectId fn", () => {
		wrapped.setState({ redirect: false});
		wrapped.setProps({ selectId, cryptoData: { ...INITIALIZE_LIST, listData: crypto }});
	
		wrapped.find("tr").at(2).simulate("click", {
			target: { id: "1027" }
		});
		expect(wrapped.state("redirect")).toEqual(true);
		expect(selectId).toHaveBeenCalled();
	});
	it("Should call handleUpdate after clicked on a Refresh button (Toolbar)", () => {		wrapped.setState({ redirect: false});
		wrapped.setProps({ prepareUpdate, fetchList, cryptoData: { ...INITIALIZE_LIST }});
	
		wrapped.find(".fa-retweet").simulate("click");

		expect(wrapped.state("redirect")).toEqual(false);
		expect(prepareUpdate).toHaveBeenCalled();
		expect(fetchList).toHaveBeenCalled();
	});
});