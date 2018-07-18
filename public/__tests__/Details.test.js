"use strict";

import React from 'react';
import expect from "expect";
import 'jsdom-global/register'; 
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import { shallow, mount, simulate, update } from 'enzyme';
import { Details } from "../components/Details";
import Toolbar from "../components/shared/Toolbar";
import List from "../components/shared/List";

import { INITIALIZE_LIST } from "../actions/state";
import { details } from "../../test/utils/cryptoData";


// import mock context
const options = new ReactRouterEnzymeContext();
const selectId = jest.fn();
const fetchDetails = jest.fn();
const prepareUpdate = jest.fn();
let wrapped;

beforeEach(() => {
	wrapped = mount(<Details />, options.get());
});
afterEach(() => {
    wrapped.unmount();
});



describe("DETAILS TESTS RENDERING:", () => {
	it("Details page should render Toolbar component", () => {
		expect(wrapped.find(Toolbar).length).toEqual(1);
	});
	it("Details page should render List component", () => {
		expect(wrapped.find(List).length).toEqual(1);
	});
});


describe("DETAILS PAGE SUBCOMPONENT RENDERING:", () => {
	it("Should fill a List with specific currency listData (data.length + 1 header)", () => {
		wrapped.setProps({ cryptoData: { ...INITIALIZE_LIST, currency: "EUR", detailsData: details["EUR"] }});
		
		// +1 is a header
		expect(wrapped.find("tr").length).toEqual(details["EUR"].btc.data.length + 1);

	});


	it("Should not redirect after clicked and not call selectId dispatch", () => {
		wrapped.setState({ redirect: false});
		wrapped.setProps({ selectId, cryptoData: { ...INITIALIZE_LIST, detailsData: details["EUR"] }});
	
		wrapped.find("tr").at(1).simulate("click", {
			target: { id: "1" }
		});
		expect(wrapped.state("redirect")).toEqual(false);
		expect(selectId).not.toHaveBeenCalled();
	});
	it("Should call handleUpdate after clicked on a Refresh button (Toolbar)", () => {		wrapped.setState({ redirect: false});
	wrapped.setProps({ prepareUpdate, fetchDetails, cryptoData: { ...INITIALIZE_LIST }});

	wrapped.find(".fa-retweet").simulate("click");

	expect(wrapped.state("redirect")).toEqual(false);
	expect(prepareUpdate).toHaveBeenCalled();
	expect(fetchDetails).toHaveBeenCalled();
});
});