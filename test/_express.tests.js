const { app } = require("./utils/express_test_routes");
const request = require("supertest");
const expect = require("expect");

const currency = "EUR";

describe('SERVER', function() {
    describe("POST /api/getCryptocurrencyList", function() {
        it(`Should return a list with 100 objects, all with '${currency}' currency!`, function(done) {
        request(app)
            // .post("/api/getList")	// STUB
			.post("/api/getCryptocurrencyList")
            .send({currency})
            .expect(200)
            .expect((res) => {
                expect(res.body.data).toHaveLength(100)
			})
			.expect((res) => {
                expect(res.body.data[0].quotes).toHaveProperty(currency)
			})
            .end(function(err, res) {
                if (err) {return done(err);}
                done();
            });
        });
    });

	describe("POST /api/getCryptocurrencyDetails", function() {
		it("Should return an object with { name: Bitcoin } property", function(done) {
		request(app)
			// .post("/api/getDetails")	// STUB
			.post("/api/getCryptocurrencyDetails")
            .send({currency, "id": "1"})
			.expect(200)
			.expect((res) => {
				expect(res.body.currency.data[0].quotes).toHaveProperty(currency);
			})
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
		});
	});
});
