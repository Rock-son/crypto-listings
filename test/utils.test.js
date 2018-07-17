

const util = require("./utils/utils"),
      expect = require("expect"),
      mocha = require("mocha");

describe("UTILS", () => {

    it("should add two numbers", () => {
      const res = util.add(33, 11);
      expect(res).toBe(44);    
    });

    it("should square a number", () => {
        const res = util.square(33);
        expect(res).toBe(1089);
    });


    it("should match a string value of obj property", () => {
      expect({
              statusCode: 200,
              headers: "nginx/1.6.5"
            }).toMatchObject({
              headers: expect.stringMatching(/nginx/)
            })  
    });

    it("should be equal a number value of obj  property", () => {
      expect({
              statusCode: 200,
              headers: "nginx/1.6.5"
            }).toMatchObject({
              statusCode: 200
            })  
    });

  describe("ASYNC", () => {
    it("should async add two numbers", (done) => {
      util.asyncAdd(4, 3, (sum) => {
        expect(typeof sum).toBe("number");
        expect(sum).toBe(7);  
        done();  
      });
    });
  });
});