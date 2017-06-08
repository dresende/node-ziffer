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
});
