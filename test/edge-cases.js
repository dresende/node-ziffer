const should = require("should");
const ziffer = require("..");

describe("Edge Cases", () => {
	it("Should return '-' for not numbers", () => {
		const n = ziffer();

		n.format(NaN).should.equal("-");
	});

	it("Should return '-' for infinite numbers", () => {
		const n = ziffer();

		n.format(Infinity).should.equal("-");
		n.format(-Infinity).should.equal("-");
	});
});
