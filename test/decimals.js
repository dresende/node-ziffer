const should = require("should");
const ziffer = require("..")();

describe("Option: decimals", () => {
	it("Should default to no rounding", () => {
		ziffer.format(1.23456).should.equal("1,23456");
	});

	it("Should round integer part if decimals is zero", () => {
		ziffer.format(1234.56, { decimals: 0 }).should.equal("1 235");
	});

	it("Should round decimal part if decimals is above zero", () => {
		ziffer.format(0.345, { decimals: 2 }).should.equal("0,35");
		ziffer.format(1234.56, { decimals: 1 }).should.equal("1 234,6");
		ziffer.format(1234.567, { decimals: 2 }).should.equal("1 234,57");
		ziffer.format(1234.564, { decimals: 2 }).should.equal("1 234,56");
	});

	it("Should add zeros if decimals is above zero", () => {
		ziffer.format(123, { decimals: 1 }).should.equal("123,0");
		ziffer.format(123.45, { decimals: 5 }).should.equal("123,45000");
		ziffer.format(123, { decimals: 10 }).should.equal("123,0000000000");
	});
});
