const should = require("should");
const ziffer = require("..")();

describe("Option: blocksize", () => {
	it("Should default to left", () => {
		ziffer.format(-123).should.equal("-123");
	});

	it("Should accept right", () => {
		ziffer.format(-123, { negative: "right" }).should.equal("123-");
	});

	it("Should accept paren", () => {
		ziffer.format(-123, { negative: "paren" }).should.equal("(123)");
	});

	it("Should accept any other string, not fail, and default to left", () => {
		ziffer.format(-123, { negative: "whatever" }).should.equal("-123");
	});
});
