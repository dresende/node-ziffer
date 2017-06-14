const should = require("should");
const ziffer = require("..");

describe("Edge Cases", () => {
	it("Should return '-' for not numbers", () => {
		const n = ziffer();

		n.format(NaN).should.equal("-");
		n.format("what").should.equal("-");
		n.format("3.01").should.equal("3,01");
		n.format("0.0000").should.equal("0");
	});

	it("Should return '-' for infinite numbers", () => {
		const n = ziffer();

		n.format(Infinity).should.equal("-");
		n.format(-Infinity).should.equal("-");
	});

	it("Should work properly with decimal numbers", () => {
		const n = ziffer();

		n.format(1.23).should.equal("1,23");
		n.format(0.123).should.equal("0,123");
		n.format(0.000123).should.equal("0,000123");
		n.format(1.23e-7).should.equal("0,000000123");
		n.format(1.23e-10).should.equal("0,000000000123");
	});
});
