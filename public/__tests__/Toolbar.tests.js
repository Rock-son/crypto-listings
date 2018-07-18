"use strict";

import React from 'react';
import expect from "expect";
import 'jsdom-global/register'; 
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import { shallow, mount, render } from 'enzyme';
import Toolbar from "../components/shared/Toolbar";

const options = new ReactRouterEnzymeContext();
const handleUpdate = jest.fn();
let wrapped;

beforeEach(() => {
    wrapped = mount(<Toolbar />, options.get());
});

afterEach(() => {
    wrapped.unmount();
});

describe("TOOLBAR TESTS:", () => {
	it("Toolbar should have a Home and a Settings Link", () => {
		expect(wrapped.find("a .fa-home").length).toEqual(1);
		expect(wrapped.find("a .fa-cog").length).toEqual(1);
	});
	it("Toolbar should have a refresh button", () => {
		expect(wrapped.find("i .fa-retweet").length).toEqual(1);
	});
});

describe("TOOLBAR BUTTON TESTS:", () => {
	it("Should call handleClick method after click", () => {
		wrapped.setProps({ handleUpdate, currency: "EUR" });
	
		wrapped.find(".fa-retweet").simulate("click");
		expect(handleUpdate).toHaveBeenCalled();
	});
});
