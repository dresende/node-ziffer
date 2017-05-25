const should = require("should");
const ziffer = require("..");

describe("Options", () => {
	it("Should keep base ones between .format() calls", () => {
		var n = ziffer({ decimals: 2 });

		// default
		n.format(12.3456).should.equal("12,35");
		// exception
		n.format(12.3456, { decimals: 3 }).should.equal("12,346");
		// default
		n.format(12.3456).should.equal("12,35");
	});
});
