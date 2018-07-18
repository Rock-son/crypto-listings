"use strict";

import expect from "expect";
import { crypto } from "./utils/cryptoData";
import { spreadAndFilterData } from "../public/components/shared/helpers";

const currency = "EUR";


describe("NORMALIZE API DATA", () => {
	it("Should return normalized object, with certain properties accessible at top level", (done) => {
		const desiredFields = ["id", "rank", "symbol", "price", "percent_change_24h"];
		const normalizedData = spreadAndFilterData(desiredFields, [crypto.data[0]], currency);
		
		expect(normalizedData[0]).toEqual(expect.objectContaining({
			id: 1,
			symbol: "BTC",
			rank: 1,
			[`price (${currency})`]: 5667.0706105242,
			"percent_change_24h": 4.17
		}));
		done();
	});
});
